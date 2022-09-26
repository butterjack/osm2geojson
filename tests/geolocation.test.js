/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('geolaction service', () => {
  it('Should return the geojson location', async () => {
    const response = await request
      .get('/geojson?bbox=57.7,11.9,57.8,12.0')
      .set('Accept', 'application/json')
      .expect(200);

    const data = JSON.parse(response.text);

    expect(data.query_overpass).toBeDefined();
    expect(data.osmtogeojson).toBeDefined();
  });

  it('Should return an error when bbox is not properly defined', async () => {
    await request
      .get('/geojson?bbox=string')
      .set('Accept', 'application/json')
      .expect(400);
  });
});
