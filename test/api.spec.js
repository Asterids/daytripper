const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');

// If cookies are needed:
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
