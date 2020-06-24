const db = require('../_db');

const User = require('./user');
const MarkerList = require('./markerList');
const Marker = require('./marker');

User.hasMany(MarkerList, { foreignKey: 'ownerId' });
MarkerList.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'ownerId',
});

MarkerList.hasMany(Marker, { foreignKey: 'parentList' });
Marker.belongsTo(MarkerList, {
  targetKey: 'id',
  foreignKey: 'parentList',
});

module.exports = {
  db,
  User,
  MarkerList,
  Marker,
};
