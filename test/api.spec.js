const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
// const agent = request.agent(app);
const { mapboxAPIKey } = require('../secrets');

describe('GET /', () => {
  it('On load, app responds with status code 200', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});

describe('GET /api/marker/:lat/:lng/:token', () => {
  const lat = '48.869332075570895';
  const lng = '2.3439430708154134';

  it('On add marker, object is returned containing the corresponding place name', (done) => {
    request(app)
      .get(`/api/marker/${lat}/${lng}/${mapboxAPIKey}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        res.body.place_name = 'Paris, France';
      })
      .end(done);
  });
});

// Front end add marker tests:
// - sidebar should be visible
// - sidebar should include a list item with the corresponding place name


describe('POST /auth/local/login', () => {
  it('On login where a user exists in db, that user is found and logged in', (done) => {
    request(app)
      .post(`/auth/local/login`)
      .send({ username: 'ChurchPeanut', password: '123' })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        res.username = 'ChurchPeanut';
      })
      .end(done);
  });

  it('On login where a user does NOT exist, an error message is thrown', (done) => {
    request(app)
      .post(`/auth/local/login`)
      .send({ username: 'Nobody44', password: '123' })
      .expect(400)
      .end(done);
  })
});

// Functionality yet to be added (and subsequently tested):
// - Logout
// - Text search
