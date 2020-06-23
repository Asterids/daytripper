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

    const { markers, markersToAdd } = this.props;

    this.state = {
      map: {}
    }
  }

  // renderMarkers needs to first create and add a marker to the map, and subsequently format it to be added to Main state
  renderMarkers = () => {
    const { map } = this.state;
    const { addMarker, markersToAdd, clearMarkersToAdd } = this.props;

    markersToAdd.forEach((marker) => {
      const newMarker = new MapboxGl.Marker()
        .setLngLat([marker.longitude, marker.latitude])
        .addTo(map);

      newMarker.id = marker.id;
      newMarker.marker_id = marker.markerOrder;
      newMarker.placeName = marker.placeName;
      newMarker.notes = marker.notes;
      newMarker.parentList = marker.parentList;

      addMarker(newMarker, false);
    })

    if (markersToAdd.length) {
      clearMarkersToAdd();
    }
  }

  componentDidMount() {
    const { addMarker, editingItinerary, markers } = this.props;

    MapboxGl.accessToken = mapboxAPIKey;

    const mapInstance = new MapboxGl.Map({
      container: 'map',
      center: [4.626541, 28.582692],
      zoom: 1.5, // starting zoom
      style: 'mapbox://styles/ruthtown/cjy1zfey01ai51cp31xzhmwnw',
    });

    // Marker id's need to be handled better
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

    this.setState({ map: mapInstance });
  }

  componentDidUpdate() {
    if (this.props.markersToAdd.length !== 0) {
      this.renderMarkers();
    }
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
