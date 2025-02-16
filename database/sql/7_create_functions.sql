SET search_path TO public, gotan;

CREATE OR REPLACE FUNCTION gotan.get_layers(
    _stationId VARCHAR(100) DEFAULT NULL,
    _routeId VARCHAR(100) DEFAULT NULL
)
    RETURNS jsonb AS $$
BEGIN
    RETURN (
        SELECT json_build_object(
                       'type', 'FeatureCollection',
                       'features', json_agg(feature)
                   )
        FROM (
                 -- Stations
                 SELECT json_build_object(
                                'type', 'Feature',
                                'id', stops.id,
                                'properties', json_build_object(
                                        'name',stops.name,
                                        'type', stops.type,
                                        'wheelchairAccessible', stops.wheelchair_accessible,
                                        'featureType', 'stop',
                                        'picture', stops.picture,
                                        'routes', array_agg(DISTINCT routes.short_name)
                                    ),
                                'geometry', ST_AsGeoJSON(stops.coordinates)::json
                            ) AS feature
                 FROM gotan.stops
                    INNER JOIN gotan.routes_stops on stops.id = routes_stops.stop_id
                    INNER JOIN gotan.routes on routes.id = routes_stops.route_id
                 WHERE (_stationId IS NULL OR station_id = _stationId)
                        AND (_routeId IS NULL OR routes.id = _routeId)
                 GROUP BY stops.id

                 UNION ALL

                 -- Routes
                 SELECT DISTINCT ON (routes.id) json_build_object(
                                'type', 'Feature',
                                'id', routes.id,
                                'properties', json_build_object(
                                        'shortName', short_name,
                                        'longName', long_name,
                                        'color', color,
                                        'featureType', 'route'
                                    ),
                                'geometry', ST_AsGeoJSON(routes.coordinates)::json
                            ) AS feature
                 FROM gotan.routes
                    INNER JOIN gotan.routes_stops rs on routes.id = rs.route_id
                    INNER JOIN gotan.stops on rs.stop_id = stops.id and (stops.station_id = _stationId OR _stationId IS NULL)
                 WHERE _routeId IS NULL OR routes.id = _routeId
             ) AS subquery
    );
END;
$$ LANGUAGE plpgsql STABLE;