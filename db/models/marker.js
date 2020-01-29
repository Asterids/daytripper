const Sequelize = require('sequelize');

const db = require('../_db');

const Marker = db.define('marker', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  placeName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  latitude: {
    type: Sequelize.DECIMAL(14),
    allowNull: false
  },
  longitude: {
    type: Sequelize.DECIMAL(14),
    allowNull: false
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}, {
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('marker-list'),
        as: 'parentList'
      }]
    })
  }
});

module.exports = Marker;
