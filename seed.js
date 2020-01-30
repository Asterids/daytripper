const Promise = require('bluebird');

const { db, User, Marker, MarkerList } = require('./db/models');

function generateUsers() {
  const users = [];
  users.push(User.build({
    username: 'Church Hill',
    email: 'churchh@gmail.com',
    password: '123',
  }));
  users.push(User.build({
    username: 'Zeke Nierenberg',
    email: 'zeke@zeke.zeke',
    password: '123',
  }));
  return users;
}


function generateMarkerLists(users) {
  const markerLists = [];
  const user1Id = users[0].id;
  const user2Id = users[1].id;
  markerLists.push(MarkerList.build({
    title: 'France & Spain Cultural Tour',
    notes: 'Between 8 and 12 people will be traveling this route together',
    ownerId: user1Id,
  }));
  markerLists.push(MarkerList.build({
    title: 'Central America Eco Tour 2020',
    notes: '12 days, 11 nights',
    ownerId: user2Id,
  }));
  markerLists.push(MarkerList.build({
    title: 'Road Trip!',
    notes: 'Crashing with friends all the way',
    ownerId: user2Id,
  }));
  return markerLists;
}


function generateMarkers(markerLists) {
  const markers = [];
  const list1Id = markerLists[0].id;
  const list2Id = markerLists[1].id;
  const list3Id = markerLists[2].id;
  markers.push(Marker.build({
    markerOrder: 1,
    placeName: 'Tigery, Essonne, France',
    latitude: 48.642894012796376,
    longitude: 2.5135070640325523,
    notes: 'A lesser known but beautiful town not far from Paris',
    parentListId: list1Id,
  }));
  markers.push(Marker.build({
    markerOrder: 2,
    placeName: 'Paris, France',
    latitude: 48.89000374365847,
    longitude: 2.3259775777392804,
    notes: 'The city of lights!',
    parentListId: list1Id,
  }));
  markers.push(Marker.build({
    markerOrder: 3,
    placeName: 'Bordeaux, Gironde, France',
    latitude: 44.85089930979544,
    longitude: -0.5779808169569662,
    notes: 'World-famous wine region',
    parentListId: list1Id,
  }));
  markers.push(Marker.build({
    markerOrder: 4,
    placeName: 'Pamplona, Navarre, Spain',
    latitude: 42.79725999592449,
    longitude: -1.6605880142479066,
    notes: 'More here than just the running of the bulls',
    parentListId: list1Id,
  }));
  markers.push(Marker.build({
    markerOrder: 1,
    placeName: 'Madrid, Madrid, Spain',
    latitude: 40.469436160514476,
    longitude: -3.6963116751776113,
    notes: 'A must-see stop for art & architecture',
    parentListId: list1Id,
  }));
  markers.push(Marker.build({
    markerOrder: 2,
    placeName: 'Lisbon, Lisboa Region, Portugal',
    latitude: 38.7370475094973,
    longitude: -9.139351592456762,
    notes: 'Wonderful sightseeing',
    parentListId: list1Id,
  }));
  markers.push(Marker.build({
    markerOrder: 1,
    placeName: 'Belize City, Belize',
    latitude: 17.486015250010283,
    longitude: -88.19572659713127,
    notes: 'Snorkeling & coral reef remediation',
    parentListId: list2Id,
  }));
  markers.push(Marker.build({
    markerOrder: 2,
    placeName: 'Guatemala City, Guatemala Department, Guatemala',
    latitude: 14.659812346109135,
    longitude: -90.51663741812028,
    notes: 'Traditional craft & agriculture immersion',
    parentListId: list2Id,
  }));
  markers.push(Marker.build({
    markerOrder: 3,
    placeName: 'Managua, Managua Department, Nicaragua',
    latitude: 12.127082191622435,
    longitude: -86.2727873005495,
    notes: 'Voluneeting with Habitat for Humanity',
    parentListId: list2Id,
  }));
  markers.push(Marker.build({
    markerOrder: 4,
    placeName: 'Tibás, San José Province, Costa Rica',
    latitude: 9.944687046341286,
    longitude: -84.08164746586641,
    notes: 'Hiking & bird watching',
    parentListId: list2Id,
  }));
  markers.push(Marker.build({
    markerOrder: '1',
    placeName: 'Washington, District of Columbia, United States of America',
    latitude: 38.928215341546434,
    longitude: -77.04324333889605,
    notes: 'DC',
    parentListId: list3Id,
  }));
  markers.push(Marker.build({
    markerOrder: '2',
    placeName: 'Raleigh, North Carolina, United States of America',
    latitude: 35.75044417612061,
    longitude: -78.63529500945897,
    notes: 'Raleigh-Durham',
    parentListId: list3Id,
  }));
  markers.push(Marker.build({
    markerOrder: '3',
    placeName: 'Asheville, North Carolina, United States of America',
    latitude: 35.5947951387932,
    longitude: -82.55741987627722,
    notes: 'Asheville, Swannanoa & Black Mountain',
    parentListId: list3Id,
  }));
  return markers;
}

function createUsers() {
  return Promise.map(generateUsers(), (user) => user.save());
}

function createMarkerLists(createdUsers) {
  return Promise.map(generateMarkerLists(createdUsers), (list) => list.save());
}

function createMarkers(createdMarkerLists) {
  return Promise.map(generateMarkers(createdMarkerLists), (marker) => marker.save());
}

function seed() {
  return createUsers()
    .then((createdUsers) => createMarkerLists(createdUsers))
    .then((createdMarkerLists) => createMarkers(createdMarkerLists));
}

console.log('Syncing database');

db.sync({ force: true })
  .then(() => {
    console.log('Seeding database');
    return seed();
  })
  .then(() => console.log('Seeding successful'))
  .catch((err) => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(() => {
    db.close();
    return null;
  });
