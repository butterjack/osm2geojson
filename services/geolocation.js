const axios = require('axios');
const osmtogeojson = require('osmtogeojson');

const getGeoJsonLocation = async (req, res, next) => {
    // get bbox from query string
    let result, bbox = req.query.bbox;

    // make call to api
    try {
        result = await axios.get(`https://www.openstreetmap.org/api/0.6/map?bbox=${bbox}`)
    } catch (error) {
        return res.status(400).send(error.response.data)
    }

    // convert to geojson
    const geojson_data = osmtogeojson(result.data);
    return res.status(200).send(geojson_data)
};

module.exports = {getGeoJsonLocation};