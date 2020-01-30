const db = require('../_db');

const User = require('./user');
const MarkerList = require('./marker-list');
const Marker = require('./marker');

MarkerList.hasMany(Marker, {
  foreignKey: 'id',
  onDelete: 'cascade', // remove all associated markers
  hooks: true, // makes the cascade actually work
});

User.hasMany(MarkerList, {
  foreignKey: 'id',
  onDelete: 'cascade',
  hooks: true,
});

Marker.belongsTo(MarkerList, { as: 'parentList' }); // creates the "parentListId" FK in Marker
MarkerList.belongsTo(User, { as: 'owner' }); // creates the `ownerId` FK in MarkerList

module.exports = {
  db,
  MarkerList,
  Marker,
  User,
};
