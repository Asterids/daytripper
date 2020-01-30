const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');

// If I need cookies to complete any tests, uncomment the following:
// const agent = request.agent(app);

describe('GET /', () => {
  it('responds with status code 200', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /api/users', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
