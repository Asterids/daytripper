const Sequelize = require('sequelize');

const databaseURI = 'postgres://localhost:5432/daytripper';

const db = new Sequelize(databaseURI, {
  logging: false,
});


module.exports = db;
