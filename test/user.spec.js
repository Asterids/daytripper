const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const models = require('../db/models');

const { User } = models;

describe('User routes', () => {
  beforeEach(() => models.db.sync({ force: true }));

  describe('/api/users/', () => {
    beforeEach(() => User.create({
      username: 'ChurchPeanut',
      email: 'churchp@catmail.com',
      password: '123',
    }));

    // MarkerList.create({
    //   title: 'A Cat\'s Journey',
    //   notes: 'The most illustrious cat details her intrepid voyage',
    //   ownerId: createdUser.id,
    // })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.be.equal('churchp@catmail.com');
        });
    });
  });
});
