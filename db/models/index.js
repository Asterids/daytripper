const db = require('../_db');

const User = require('./user');
const MarkerList = require('./markerList');
const Marker = require('./marker');


Marker.belongsTo(MarkerList, {
  as: 'parentList', // creates the "parentListId" FK in Marker
  targetKey: 'id',
  onDelete: 'cascade',
  hooks: true,
});

MarkerList.belongsTo(User, {
  as: 'owner', // creates the `ownerId` FK in MarkerList
  targetKey: 'id',
  onDelete: 'cascade',
  hooks: true,
});


module.exports = {
  db,
  MarkerList,
  Marker,
  User,
};
