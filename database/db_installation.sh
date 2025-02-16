#!/bin/bash

# Clear screen (optional)
clear

# DATABASE INSTALLATION

# Load configuration from database.ini
if [ ! -f database.ini ]; then
    echo "Error: database.ini file not found!"
    exit 1
fi

# Read variables from database.ini
while IFS='=' read -r key value; do
    if [[ ! $key =~ ^# && -n $key ]]; then
        eval "${key}='${value}'"
    fi
done < database.ini

# Set PostgreSQL password as an environment variable
export PGPASSWORD="$password"

echo "Database installation..."

# Execute SQL scripts in order
psql -h "$host" -d "$dbname" -U "$user" -p "$port" -b -q -f sql/1_drop_schemas.sql
psql -h "$host" -d "$dbname" -U "$user" -p "$port" -b -q -f sql/2_create_schemas.sql
psql -h "$host" -d "$dbname" -U "$user" -p "$port" -b -q -f sql/3_create_extensions.sql
psql -h "$host" -d "$dbname" -U "$user" -p "$port" -b -q -f sql/4_create_tables.sql

# Fill temporary tables from data source
psql -h "$host" -d "$dbname" -U "$user" -p "$port" -c "\copy gotan.temp_trips FROM 'datasource/trips.txt' DELIMITER ',' CSV HEADER;"
psql -h "$host" -d "$dbname" -U "$user" -p "$port" -c "\copy gotan.temp_routes FROM 'datasource/routes.txt' DELIMITER ',' CSV HEADER;"
psql -h "$host" -d "$dbname" -U "$user" -p "$port" -c "\copy gotan.temp_shapes FROM 'datasource/shapes.txt' DELIMITER ',' CSV HEADER;"
psql -h "$host" -d "$dbname" -U "$user" -p "$port" -c "\copy gotan.temp_stop_times FROM 'datasource/stop_times.txt' DELIMITER ',' CSV HEADER;"
psql -h "$host" -d "$dbname" -U "$user" -p "$port" -c "\copy gotan.temp_stops FROM 'datasource/stops.txt' DELIMITER ',' CSV HEADER;"

# Fill final tables with data in temporary tables
psql -h "$host" -d "$dbname" -U "$user" -p "$port" -b -q -f sql/5_fill_tables.sql
psql -h "$host" -d "$dbname" -U "$user" -p "$port" -b -q -f sql/6_drop_temp_tables.sql
psql -h "$host" -d "$dbname" -U "$user" -p "$port" -b -q -f sql/7_create_functions.sql

echo "End of treatment."

# Pause for user input (optional, can be removed)
read -p "Press Enter to exit..."
