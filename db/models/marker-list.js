const Sequelize = require('sequelize');

const db = require('../_db');

const MarkerList = db.define('marker-list', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
}, {
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('user'),
        as: 'owner'
      }]
    })
  }
});

module.exports = MarkerList;
