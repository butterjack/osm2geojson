/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../app');
const { errorHandler } = require('../middlewares/error');

const request = supertest(app);

// Mocked Express Request object.

let req;

// Mocked Express Response object.
let res;

// Mocked Express Next function.
const next = jest.fn();

/**
    * Reset the `req` and `res` object before each test is ran.
*/
beforeEach(() => {
  req = {
    params: {},
    body: {},
  };

  res = {
    data: null,
    code: null,
    status(status) {
      this.code = status;
      return this;
    },
    send(payload) {
      this.data = payload;
    },
  };

  next.mockClear();
});

describe('app', () => {
  it('Should return an OK message', async () => {
    const response = await request
      .get('/health')
      .set('Accept', 'application/json')
      .expect(200);

    expect(response.text).toBeDefined();
    expect(response.text).toBe('Ok');
  });

  it('should handle error', () => {
    errorHandler(new Error('Something broke!'), req, res, next);

    expect(res.code).toBeDefined();
    expect(res.code).toBe(500);

    expect(res.data).toBeDefined();
    expect(res.data.error.message).toBe('Something broke!');
  });
});
