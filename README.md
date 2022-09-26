# osm2geojson API

We are providing one endpoint to get GeoJSON features of a location given with a geolocation box (bounding box).

GeoJSON is an open format for exchanging geospatial data using the JSON standard representing simple geographic features and their non-spatial attributes. Using the JavaScript Object Notation (JSON) standard, GeoJSON is a format for encoding various geographic data structures. It uses a geographic coordinate reference system, the World Geodetic System 1984, and units expressed in decimal degrees.

For more information: `https://doc.arcgis.com/fr/arcgis-online/reference/geojson.htm`

## Available Endpoints

### `GET /geojson`

This endpoints expects the mandotory parameter `bbox`. We use the `https://www.openstreetmap.org/api` to get osm data then we convert it to geoJson with osmtogeojson. But osmtogeojson package is not maintained(last publication was 3 years before) and it has a lot of open issues(44 issues). One relevant issue is `https://github.com/tyrasd/osmtogeojson/issues/130`

Thus we So worked with the package as instructed and I added the results from query-overpass. And we can see the difference in results in the examples.

#### **Request**

The request must contain this field:

| Field  | Type        | Description                                                                              |
| ------ | ----------- | ---------------------------------------------------------------------------------------- |
| `bbox` | queryString | The parameter bbox is required, and must be of the form min_lon,min_lat,max_lon,max_lat. |

#### **Response**

Returns a status code of 200 on success. May return other status codes like 400 (bad request), 500 (internal server error).

Returns json-formatted data. The result is structured like this:

```json
  {
    "osmtogeojson":{
        "type": string,
        "features": [
            {
                "type": string,
                "geomotry": {
                    "type": string,
                    "coordinates": [integer]
                },
                "properties": {

                }
            }
        ]
    },
    "query_overpass":{
        "type": string,
        "features": [
            {
                "type": string,
                "geomotry": {
                    "type": string,
                    "coordinates": [integer]
                },
                "properties": {

                }
            }
        ]
    }

  }
```
