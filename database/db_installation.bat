cls
REM DATABASE INSTALLATION
set PATH=%PATH%;C:\Program Files\pgAdmin 4\v5\runtime
REM Including .ini file
for /f "delims=" %%x in (.\database.ini) do (set "%%x")
setx PGPASSWORD "%password%"

echo Database installation...

psql -h %host% -d %dbname% -U %user% -p %port% -b -q -f sql/1_drop_schemas.sql
psql -h %host% -d %dbname% -U %user% -p %port% -b -q -f sql/2_create_schemas.sql
psql -h %host% -d %dbname% -U %user% -p %port% -b -q -f sql/3_create_extensions.sql
psql -h %host% -d %dbname% -U %user% -p %port% -b -q -f sql/4_create_tables.sql
REM Fill temporary tables from datasource given by Nantes opendata 
psql -h %host% -d %dbname% -U %user% -p %port% -c "\copy gotan.temp_trips FROM 'datasource/trips.txt' DELIMITER ',' CSV HEADER;"
psql -h %host% -d %dbname% -U %user% -p %port% -c "\copy gotan.temp_routes FROM 'datasource/routes.txt' DELIMITER ',' CSV HEADER;"
psql -h %host% -d %dbname% -U %user% -p %port% -c "\copy gotan.temp_shapes FROM 'datasource/shapes.txt' DELIMITER ',' CSV HEADER;"
psql -h %host% -d %dbname% -U %user% -p %port% -c "\copy gotan.temp_stop_times FROM 'datasource/stop_times.txt' DELIMITER ',' CSV HEADER;"
psql -h %host% -d %dbname% -U %user% -p %port% -c "\copy gotan.temp_stops FROM 'datasource/stops.txt' DELIMITER ',' CSV HEADER;"
REM Fill final tables with data in temporary tables 
psql -h %host% -d %dbname% -U %user% -p %port% -b -q -f sql/5_fill_tables.sql
psql -h %host% -d %dbname% -U %user% -p %port% -b -q -f sql/6_drop_temp_tables.sql
psql -h %host% -d %dbname% -U %user% -p %port% -b -q -f sql/7_create_functions.sql

echo End of treatment.
pause