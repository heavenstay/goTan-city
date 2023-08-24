# Database Setup for goTan-city

This directory contains all the necessary files and scripts to set up and manage the PostgreSQL database for the `goTan-city` project.

## Configuration

- **`database.ini`**: This file contains the configuration settings for connecting to the PostgreSQL database. You need to update it with your database requirements. 

## Datasource

The `datasource` subdirectory contains raw data files that are used to populate the database tables. These include:
- `routes.txt`: Information about transportation routes.
- `shapes.txt`: Data related to the shapes of routes.
- `stop_times.txt`: Details about stop times for different routes.
- `stops.txt`: Information about various stops.
- `trips.txt`: Data about different trips.

This data were provided by the city of Nantes.

## SQL Scripts

The SQL scripts are sequentially numbered to ensure they are executed in the correct order:

1. **`1_drop_schemas.sql`**: Drops the `gotan` schema if it exists, ensuring a clean slate for the database setup.

2. **`2_create_schemas.sql`**: Creates the `gotan` schema which will house all the tables and related database objects.

3. **`3_create_extensions.sql`**: Adds the `postgis` extension to the `gotan` schema. This extension provides support for geographic objects, allowing for spatial queries.

4. **`4_create_tables.sql`**: 
   - Defines temporary tables (`temp_stops`, `temp_stop_times`, `temp_trips`, `temp_shapes`, `temp_routes`) to facilitate data import.
   - Defines the final tables:
     - `stations`: Contains unique stations with their names and coordinates.
     - `stops`: Contains transportation stops, their type (bus or tram), accessibility information, associated picture, and coordinates.
     - `routes`: Contains transportation routes with their names, colors, types, and coordinates.
     - `routes_stops`: A junction table that establishes a many-to-many relationship between routes and stops.

5. **`5_fill_tables.sql`**: 
   - Populates the `stations`, `stops`, and `routes` tables using data from the temporary tables.
   - Defines relationships between routes, stops, and stations.

6. **`6_drop_temp_tables.sql`**: Drops the temporary tables after the data has been imported into the final tables, ensuring a clean database structure.

7. **`7_create_functions.sql`**: 
   - Defines a function `gotan.get_layers` that returns a JSON object containing features for stops and routes. This function can be used to fetch map layers based on specific criteria, such as a particular station or route.

## Installation & Setup

To set up the database:

1. Ensure you have PostgreSQL installed and running on your machine.
2. Update the `database.ini` file with your database connection details if they differ from the default settings.
3. Navigate to the `database` directory.
4. Run the `db_installation.bat` script. This script will:
   - Set the database connection based on the `database.ini` file.
   - Execute the SQL scripts in the correct order to set up the database schema, tables, and populate them with data.

```bash
./db_installation.bat
```
If you don't use windows, just launch each script one by one by following the .bat process. Don't forget to import all csv in the temporary tables. 