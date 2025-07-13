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

1. Download all of the COTREX trails from <https://geodata-cpw.hub.arcgis.com/datasets/CPW::cpwadmindata/explore?layer=15&location=39.373423%2C-104.927922%2C10.42>
2. Convert the 229MB GeoJSON file to a 51MB geoparquet file.
3. Run this gnarly query in DuckDB:

```sql
copy (select if(name ilike 'Colorado Trail Segment %', name, if(name_1 ilike 'Colorado Trail Segment %', name_1, if(name_2 ilike 'Colorado Trail Segment %', name_2, if(name_3 ilike 'Colorado Trail Segment %', name_3, null)))) as segment_name, cast(substr(segment_name, 24) as bigint) as segment, st_linemerge(st_union_agg(geom)) as geometry from 'cortex-trails.parquet' where segment_name is not null group by segment_name) to 'colorado-trail.json' with (format gdal, driver 'GeoJSON');
```

4. Manually clean up a few multi-line strings.
