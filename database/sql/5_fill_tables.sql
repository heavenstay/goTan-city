SET search_path TO gotan;

-- Insert data from temporary tables to main tables
INSERT INTO line_stops (id, name)
SELECT DISTINCT
    s.stop_id as id,
    s.stop_name as name
FROM temp_stops s
         LEFT JOIN temp_stop_times st ON s.stop_id = st.stop_id
         LEFT JOIN temp_trips t ON st.trip_id = t.trip_id
         LEFT JOIN temp_routes r ON t.route_id = r.route_id
WHERE s.parent_station is null;

INSERT INTO stops (id, name, type, wheelchair_accessible, coordinates, line_stop_id)
SELECT DISTINCT
    s.stop_id as id,
    s.stop_name as name,
    CASE r.route_type
        WHEN 0 THEN 'TRAM'::transport_type
        ELSE 'BUS'::transport_type
        END as "type",
    CASE s.wheelchair_boarding
        WHEN 1 THEN TRUE
        WHEN 2 THEN FALSE
        END as wheelchair_accessible,
    ST_SetSRID(ST_MakePoint(s.stop_lon, s.stop_lat), 4326) as coordinates,
    s.parent_station as line_stop_id
FROM temp_stops s
         INNER JOIN temp_stop_times st ON s.stop_id = st.stop_id
         INNER JOIN temp_trips t ON st.trip_id = t.trip_id
         INNER JOIN temp_routes r ON t.route_id = r.route_id
WHERE s.parent_station is not null;

WITH shape_lines AS (
    SELECT
        t.route_id,
        t.shape_id,
        ST_MakeLine(ST_SetSRID(ST_MakePoint(s.shape_pt_lon, s.shape_pt_lat), 4326) ORDER BY s.shape_pt_sequence) AS line
    FROM temp_trips t
             INNER JOIN temp_shapes s ON t.shape_id = s.shape_id
    GROUP BY t.route_id, t.shape_id, s.shape_pt_lon, s.shape_pt_lat
), route_shapes AS (
    SELECT DISTINCT
        route_id,
        -- Create a line string from the points
        ST_Collect(line) AS coordinates
    FROM shape_lines
    GROUP BY route_id
)
INSERT INTO routes (id, short_name, long_name, color, picture, coordinates, "order")
SELECT DISTINCT
    r.route_id as id,
    r.route_short_name as short_name,
    r.route_long_name as long_name,
    r.route_color as color,
    NULL as picture,
    -- Create a multi line string from the lines
    st_multi(rs.coordinates) as coordinates,
    r.route_sort_order as "order"
FROM temp_routes r
         INNER JOIN route_shapes rs ON r.route_id = rs.route_id
GROUP BY r.route_id, r.route_short_name, r.route_long_name, r.route_color, rs.coordinates, r.route_sort_order;


INSERT INTO routes_stops (route_id, stop_id, "order")
SELECT DISTINCT ON (t.route_id, st.stop_id)
    t.route_id,
    st.stop_id,
    row_number() OVER (ORDER BY st.stop_sequence) AS "order"
FROM temp_stop_times st
         INNER JOIN temp_trips t ON st.trip_id = t.trip_id
WHERE t.route_id IS NOT NULL AND st.stop_id IS NOT NULL
GROUP BY t.route_id, st.stop_id, st.stop_sequence
ORDER BY t.route_id, st.stop_id, st.stop_sequence;