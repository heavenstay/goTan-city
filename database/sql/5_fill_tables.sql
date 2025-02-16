SET search_path TO public, gotan;

-- Insert data from temporary tables to main tables
INSERT INTO gotan.stations (id, name, coordinates)
SELECT DISTINCT
    s.stop_id as id,
    s.stop_name as name,
    ST_SetSRID(ST_MakePoint(s.stop_lon, s.stop_lat), 4326) as coordinates
FROM gotan.temp_stops s
WHERE s.parent_station is null;

INSERT INTO gotan.stops (id, name, type, wheelchair_accessible, picture, coordinates, station_id)
SELECT DISTINCT
    s.stop_id as id,
    s.stop_name as name,
    CASE r.route_type
        WHEN 0 THEN 'TRAM'::gotan.transport_type
        ELSE 'BUS'::gotan.transport_type
        END as "type",
    CASE s.wheelchair_boarding
        WHEN 1 THEN TRUE
        WHEN 2 THEN FALSE
        END as wheelchair_accessible,
    null as picture,
    ST_SetSRID(ST_MakePoint(s.stop_lon, s.stop_lat), 4326) as coordinates,
    s.parent_station as station_id
FROM gotan.temp_stops s
         INNER JOIN gotan.temp_stop_times st ON s.stop_id = st.stop_id
         INNER JOIN gotan.temp_trips t ON st.trip_id = t.trip_id
         INNER JOIN gotan.temp_routes r ON t.route_id = r.route_id
WHERE s.parent_station is not null AND r.route_id IN ('1-0', '2-0', '3-0', '4-0', '5-0');

-- Delete stations which are not used in stops
DELETE FROM gotan.stations
WHERE id NOT IN (SELECT DISTINCT station_id FROM stops);

WITH lines AS (
    SELECT
        route_id,
        ST_MakeLine(geom ORDER BY shape_pt_sequence) AS line
    FROM (
             SELECT DISTINCT ON (t.route_id, ST_SetSRID(ST_MakePoint(s.shape_pt_lon, s.shape_pt_lat), 4326))
                 t.route_id,
                 s.shape_pt_sequence,
                 ST_SetSRID(ST_MakePoint(s.shape_pt_lon, s.shape_pt_lat), 4326) AS geom
             FROM (
                  select distinct on (trip_headsign, route_id) * from gotan.temp_trips
                    where trip_id like '%L-Ma-Me-J-01%' and route_id in ('1-0', '2-0', '3-0', '4-0', '5-0')
                    order by route_id
                    limit 10
              ) t
             INNER JOIN gotan.temp_shapes s ON t.shape_id = s.shape_id
         ) AS subquery
    GROUP BY route_id
)
INSERT INTO gotan.routes (id, short_name, long_name, color, type, coordinates)
SELECT DISTINCT
    r.route_id as id,
    r.route_short_name as short_name,
    r.route_long_name as long_name,
    ('#' || r.route_color) as color,
    CASE r.route_type
        WHEN 0 THEN 'TRAM'::gotan.transport_type
        ELSE 'BUS'::gotan.transport_type
        END as "type",
    ST_Collect(l.line) as coordinates
FROM gotan.temp_routes r
         INNER JOIN lines l ON r.route_id = l.route_id
GROUP BY r.route_id, r.route_short_name, r.route_long_name, r.route_color, r.route_type, l.line;

INSERT INTO gotan.routes_stops (route_id, stop_id)
SELECT DISTINCT ON (t.route_id, st.stop_id)
    t.route_id,
    st.stop_id
FROM gotan.temp_stop_times st
         INNER JOIN gotan.temp_trips t ON st.trip_id = t.trip_id
WHERE t.route_id IS NOT NULL AND st.stop_id IS NOT NULL AND t.route_id in ('1-0', '2-0', '3-0', '4-0', '5-0')
GROUP BY t.route_id, st.stop_id
ORDER BY t.route_id, st.stop_id;