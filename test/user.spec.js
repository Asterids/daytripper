const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const models = require('../db/models');

const { User, MarkerList } = models;

describe('USER', () => {
  beforeEach(() => models.db.sync({ force: true }));

  describe('/api/users', () => {
    beforeEach(() => User.create({
      username: 'ChurchPeanut',
      email: 'churchp@catmail.com',
      password: '123',
    }));

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.equal('churchp@catmail.com');
        });
    });
  });

  describe('/api/lists/:userId', () => {
    beforeEach(() => User.create({
      id: 1,
      username: 'ChurchPeanut',
      email: 'churchp@catmail.com',
      password: '123',
    })
      .then((createdUser) => MarkerList.create({
        title: 'A Cat\'s Journey',
        notes: 'The Most Illustrious Cat details her intrepid voyage',
        ownerId: createdUser.id,
      })));

    it('GET /api/lists/:userId', () => {
      return request(app)
        .get('/api/lists/1')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].title).to.equal('A Cat\'s Journey');
        });
    });
  });
});
