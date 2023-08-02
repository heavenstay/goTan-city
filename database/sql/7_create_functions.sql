SET search_path TO gotan;

CREATE OR REPLACE FUNCTION gotan.get_layers(
    _stopType gotan.transport_type DEFAULT NULL,
    _stopName TEXT DEFAULT NULL,
    _getStops BOOLEAN DEFAULT TRUE,
    _getRoutes BOOLEAN DEFAULT TRUE
)
    RETURNS jsonb AS $$
BEGIN
    RETURN (
        SELECT json_build_object(
                       'type', 'FeatureCollection',
                       'features', json_agg(feature)
                   )
        FROM (
                 SELECT json_build_object(
                                'type', 'Feature',
                                'id', stops.id,
                                'properties', json_build_object(
                                        'name',stops.name,
                                        'type', stops.type,
                                        'wheelchair_accessible', stops.wheelchair_accessible,
                                        'feature_type', 'stop',
                                        'routes', array_agg(DISTINCT routes.short_name)
                                    ),
                                'geometry', gotan.ST_AsGeoJSON(stops.coordinates)::json
                            ) AS feature
                 FROM gotan.stops
                    INNER JOIN gotan.routes_stops on stops.id = routes_stops.stop_id
                    INNER JOIN gotan.routes on routes.id = routes_stops.route_id
                 WHERE (_getStops = true AND ((_stopType IS NULL OR stops.type = _stopType) AND (_stopName IS NULL OR stops.name ILIKE '%' || _stopName || '%')))
                 group by stops.id

                 UNION ALL

                 SELECT json_build_object(
                                'type', 'Feature',
                                'id', id,
                                'properties', json_build_object(
                                        'short_name', short_name,
                                        'long_name', long_name,
                                        'color', color,
                                        'picture', picture,
                                        'feature_type', 'route'
                                    ),
                                'geometry', gotan.ST_AsGeoJSON(coordinates)::json
                            ) AS feature
                 FROM gotan.routes
                 WHERE (_getRoutes = true)
             ) AS subquery
    );
END;
$$ LANGUAGE plpgsql STABLE;