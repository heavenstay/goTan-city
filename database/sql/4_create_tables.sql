SET search_path TO public, gotan;

-- Temporary tables ---
CREATE TABLE gotan.temp_stops (
    stop_id VARCHAR(100),
    stop_name VARCHAR(100),
    stop_desc VARCHAR(100),
    stop_lat DOUBLE PRECISION,
    stop_lon DOUBLE PRECISION,
    zone_id VARCHAR(100),
    stop_url VARCHAR(100),
    location_type INTEGER,
    parent_station VARCHAR(100),
    wheelchair_boarding INTEGER
);

CREATE TABLE gotan.temp_stop_times (
    trip_id VARCHAR(100),
    arrival_time VARCHAR(100),
    departure_time VARCHAR(100),
    stop_id VARCHAR(100),
    stop_sequence INTEGER,
    pickup_type INTEGER,
    drop_off_type INTEGER,
    timepoint INTEGER,
    stop_headsign VARCHAR(100)
);

CREATE TABLE gotan.temp_trips (
    route_id VARCHAR(100),
    service_id VARCHAR(100),
    trip_id VARCHAR(100),
    trip_headsign VARCHAR(100),
    direction_id INTEGER,
    block_id INTEGER,
    shape_id VARCHAR(100),
    wheelchair_accessible INTEGER
);

CREATE TABLE gotan.temp_shapes (
    shape_id VARCHAR(100),
    shape_pt_lat DOUBLE PRECISION,
    shape_pt_lon DOUBLE PRECISION,
    shape_pt_sequence INTEGER
);

CREATE TABLE gotan.temp_routes (
    route_id VARCHAR(100),
    route_short_name VARCHAR(50),
    route_long_name TEXT,
    route_desc TEXT,
    route_type INTEGER,
    route_color VARCHAR(6),
    route_text_color VARCHAR(6),
    route_sort_order INTEGER
);


-- Final tables ---
CREATE TYPE gotan.transport_type AS ENUM ('BUS', 'TRAM');

CREATE TABLE gotan.stations (
    id varchar(100) PRIMARY KEY,
    name varchar(100) not null,
    coordinates geometry(POINT, 4326)
);

CREATE TABLE gotan.stops (
    id varchar(100) PRIMARY KEY,
    name varchar(100) not null,
    type gotan.transport_type not null,
    wheelchair_accessible boolean not null,
    picture text,
    station_id varchar(100) NOT NULL REFERENCES gotan.stations(id),
    coordinates GEOMETRY(POINT, 4326)
);

CREATE TABLE gotan.routes (
    id varchar(100) PRIMARY KEY,
    short_name varchar(50) not null,
    long_name text not null,
    color varchar(7) not null,
    type gotan.transport_type not null,
    coordinates GEOMETRY(MULTILINESTRING, 4326)
);

CREATE TABLE gotan.routes_stops (
    route_id varchar(100) NOT NULL REFERENCES gotan.routes(id),
    stop_id varchar(100) NOT NULL REFERENCES gotan.stops(id),
    PRIMARY KEY (route_id, stop_id)
);