# A Colorado Trail relay

Brought to you by Bex 🚴‍♀️ and Kelly 🏃‍♀️.

## Updating the track

Until we figure out how to pull directly from the Garmin API, we have to:

1. Go to <https://share.garmin.com/JOYQV/>
2. Open developer tools
3. Find the response from `wss://share.garmin.com/signalr/connect`
4. Reload the page (zoomed out far enough to see the entire track)
5. Copy the last `UpdateUser` message to [src/data/update-user.json](./src/data/update-user.json)

## Creating the Colorado Trail GeoJSON

You'll need [GDAL 3.11](https://gdal.org/en/stable/).

1. Download all of the COTREX trails from <https://geodata-cpw.hub.arcgis.com/datasets/CPW::cpwadmindata/explore?layer=15&location=39.373423%2C-104.927922%2C10.42> (~220MB)
2. Move the file to `data/CORTEX_Trails.geojson` (this location is ignored by git)
3. Run `gdal vector convert data/CORTEX_TRAILS.geojson data/cortex-trails.parquet`
4. Run following gnarly SQL statement in DuckDB:

    ```sql
    copy (
        select ct_name, segment, ST_LineMerge(ST_Union_Agg(geometry)) as geometry from (
        select
            if(name ilike 'Colorado Trail Segment %', name,
            if(name_1 ilike 'Colorado Trail Segment %', name_1,
            if(name_2 ilike 'Colorado Trail Segment %', name_2,
            if(name_3 ilike 'Colorado Trail Segment %', name_3, null)))) as ct_name,
            cast(substr(ct_name, 24) as bigint) as segment,
            *
        from 'data/cortex-trails.parquet' where segment is not null
        ) group by segment, ct_name order by segment
        ) to 'data/colorado-trails-segments.json' (FORMAT gdal, DRIVER "GeoJSON");
    ```

5. Manually clean up the segments file with QGIS (Topology Checker plugin helps) and by hand 🫠
