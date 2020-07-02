const Sequelize = require('sequelize');

let databaseURI = null;

if (process.env.NODE_ENV === 'production') {
  databaseURI = process.env.prodPostgres;
} else {
  databaseURI = 'postgres://localhost:5432/daytripper';

}


const db = new Sequelize(databaseURI, {
  logging: false,
});


module.exports = db;
