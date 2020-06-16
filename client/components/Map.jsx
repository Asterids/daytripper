import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl';
import axios from 'axios';
// import SVG from 'react-inlinesvg';

// const Icon = () => <SVG src='../../public/images/marker-15.svg' />;
const { mapboxAPIKey } = require('../../secrets')

export default class Map extends Component {
  constructor(props) {
    super(props);

    const { markers } = this.props

    this.state = {
      // map: {},
      markers
    }
  }

  // take in a list of new markers - "toAdd" = []
  // forEach...
  // marker.addTo(mapInstance)

  componentDidMount() {
    const { addMarker, editingItinerary, markers } = this.props;

    MapboxGl.accessToken = mapboxAPIKey;

    const mapInstance = new MapboxGl.Map({
      container: 'map',
      center: [4.626541, 28.582692],
      zoom: 1.5, // starting zoom
      style: 'mapbox://styles/ruthtown/cjy1zfey01ai51cp31xzhmwnw',
    });

    // *** Implement & test when markers are persistent/saveable to DB
    // mapInstance.on('load', function (e) {
      // if (markers) {
        // markers.forEach(marker) => {
          // let existingMarker = new MapboxGl.Marker()
          //   .setLngLat(marker._lngLat.lng, marker._lngLat.lat)
          //   .addTo(mapInstance)
      
          // addMarker(existingMarker)
        // }}
      // })

    let counter = 1;

    mapInstance.on('click', (e) => {
      if (editingItinerary || !markers.length) {
        axios.get(`/api/marker/${e.lngLat.lat}/${e.lngLat.lng}/${MapboxGl.accessToken}`)
          .then((res) => (
            res.data.place_name
          ))
          .then((result) => {
            const newMarker = new MapboxGl.Marker()
              .setLngLat([e.lngLat.lng, e.lngLat.lat])
              .addTo(mapInstance);
            newMarker.marker_id = counter;
            newMarker.placeName = result;
            newMarker.notes = '';
            counter++;
            return newMarker;
          })
          .then((mrkr) => {
            addMarker(mrkr);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });

    // this.setState({ map: mapInstance });
  }

  render() {
    return (
      <div id="map" ref={(el) => { this.container = el; }} />
    );
  }
}


// ***** NOTES *****

// *** GEOJSON: ***
// addMarker({
//   type: 'Feature',
//   geometry: {
//     type: 'Point',
//     coordinates: [e.lngLat.lng, e.lngLat.lat]
//   },
//   properties: {
//     title: 'Marker',
//     description: '' + (markers.length + 1),
//     // 'marker-symbol': '' + (markers.length + 1),
//   }
// })

// *** DOM ELEMENT: ***
// let icon = document.createElement('SVG');
// icon.src = '../../public/images/marker-15.svg';
// icon.className = 'marker';
