const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
// const agent = request.agent(app);

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
  const token = 'pk.eyJ1IjoicnV0aHRvd24iLCJhIjoiY2sybDBzd2VvMDI2cjNvcG43YzdxZHptcyJ9.39XFWCL8XvT7UqVK7M8BLg';

  it('On add marker, object is returned containing the corresponding place name', (done) => {
    request(app)
      .get(`/api/marker/${lat}/${lng}/${token}`)
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


/*
describe('/api/contracts/', () => {

  beforeEach(() => {
      return Contract.create({contractAddress: 123456789})
  })

  it('PUT /api/contracts should change from status "Created" to status "Pending"', () => {

    return request(app)
      .put('/api/contracts/1')
      .send({status: 'Pending'})
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('object')
        expect(res.body.status).to.equal('Pending')
      })
  })
})
*/

// Functionality yet to be added (and subsequently tested):
// - Login / Logout
// - Text search
