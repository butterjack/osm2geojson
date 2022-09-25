/* eslint-disable camelcase */
/* eslint-disable consistent-return */

const axios = require('axios');
const osmtogeojson = require('osmtogeojson');
const query_overpass = require('query-overpass');

// osmtogeojson package is not maintained(last publication was 3 years before)
// and it has a lot of open issues(44 issues)
// Relevant issue: https://github.com/tyrasd/osmtogeojson/issues/130
// So I worked with the package as instructed and I added the results from query-overpass

// eslint-disable-next-line no-unused-vars
const getGeoJsonLocation = async (req, res, next) => {
  // get bbox from query string
  let result; const
    { bbox } = req.query;

  // make call to api
  try {
    result = await axios.get(`https://www.openstreetmap.org/api/0.6/map?bbox=${bbox}`);
  } catch (error) {
    return res.status(400).send(error.response.data);
  }

  // convert to geojson
  const geojson_data = osmtogeojson(result.data);

  // add query_overpass data
  query_overpass(`node(${bbox})[amenity=bar];out;`, (err, data) => {
    if (err) {
      return res.json({ osmtogeojson: geojson_data });
    }
    console.log(data);
    return res.json({
      osmtogeojson: geojson_data,
      query_overpass: data,
    });
  });
};

module.exports = { getGeoJsonLocation };
