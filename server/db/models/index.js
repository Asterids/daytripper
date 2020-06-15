const db = require('../_db');

const User = require('./user');
const MarkerList = require('./markerList');
const Marker = require('./marker');

User.hasMany(MarkerList, { foreignKey: 'ownerId' });
MarkerList.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'ownerId',
  onDelete: 'cascade',
  hooks: true,
});

MarkerList.hasMany(Marker, { foreignKey: 'parentList' });
Marker.belongsTo(MarkerList, {
  targetKey: 'id',
  foreignKey: 'parentList',
  onDelete: 'cascade',
  hooks: true,
});

module.exports = {
  db,
  User,
  MarkerList,
  Marker,
};
