const Sequelize = require('sequelize');

const db = require('../_db');

const MarkerList = db.define('markerList', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
}, {
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('user'),
        as: 'owner',
      }],
    }),
  },
});

module.exports = MarkerList;
