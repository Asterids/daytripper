const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const models = require('../db/test-db');

const { User, MarkerList } = models;

describe('USER', () => {
  beforeEach(() => models.db.sync({ force: true }));

  describe('/api/users', () => {
    beforeEach(() => User.create({
      username: 'ChurchPeanut',
      password: '123',
    }));

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].username).to.equal('ChurchPeanut');
        });
    });
  });

  describe('/api/lists/:userId', () => {
    beforeEach(() => User.create({
      id: 'cf31fc3f-e77a-4a45-8e97-de12429606f1',
      username: 'ChurchPeanut',
      password: '123',
    })
      .then((createdUser) => MarkerList.create({
        title: 'A Cat\'s Journey',
        notes: 'The Most Illustrious Cat details her intrepid voyage',
        ownerId: createdUser.id,
      })));

    it('GET /api/lists/:userId', () => {
      return request(app)
        .get('/api/lists/cf31fc3f-e77a-4a45-8e97-de12429606f1')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].title).to.equal('A Cat\'s Journey');
        });
    });
  });
});
