import React, { Component } from 'react';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl';
import axios from 'axios';
// import SVG from 'react-inlinesvg';

// const Icon = () => <SVG src='../../public/images/marker-15.svg' />;
let mapboxAPIKey = null;

const isDev = document.getElementById('development') !== undefined;

if (isDev) {
  mapboxAPIKey = require('../../secrets').mapboxAPIKey;
} else {
  mapboxAPIKey = 'pk.eyJ1IjoicnV0aHRvd24iLCJhIjoiY2tjNHhoczR1MGM3ZTJycW85aXQyNGw0ZSJ9.ArVhsQSxpzIDWbX_BHUAeg';
}

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: {},
      nextMarkerId: 1,
    }
  }

  // renderMarkers needs to first create and add a marker to the map, and subsequently format it to be added to Main state
  renderMarkers = (markersToAdd, options) => {
    const { map } = this.state;
    const { addMarker, clearMarkersToAdd } = this.props;

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

    map.flyTo(options);

    clearMarkersToAdd();
  }


  mapFlyTo = (coords) => {
    const { map } = this.state;
    const { clearSearchCoords } = this.props;
    
    map.flyTo({ center: coords, zoom: 6, speed: 2 })

    clearSearchCoords();
  }


  calculateNewMapData = (markersToAdd) => {
    // Find center point by averaging markers' latitude and longitude
    const avgLat = markersToAdd.reduce((accum, mrkr) => accum + mrkr.latitude, 0) / markersToAdd.length;
    const avgLng = markersToAdd.reduce((accum, mrkr) => accum + mrkr.longitude, 0) / markersToAdd.length;

    // Find the furthest marker from center
    let greatestDiffLat = 0,
        greatestDiffLng = 0;

    markersToAdd.forEach((marker) => {
      const diffLat = Math.abs(avgLat - marker.latitude)
      const diffLng = Math.abs(avgLng - marker.longitude)
      if (diffLat > greatestDiffLat) { greatestDiffLat = diffLat }
      if (diffLng > greatestDiffLng) { greatestDiffLng = diffLng }
    })

    // Ideally I will use some formula to calculate the appropriate zoom level based on the furthest point from center.
    // The actual zoom level number will decrease (i.e. zoom out) as the greatest difference increases:
    // A zoom level of ~5.5 is appropriate for greatistDiffLng of 2.4 (2.4 * 2.29 = 5.49)
    // A zoom level of ~4.25 is appropriate for greatestDiffLat of 4.3 (4.3 * .98 = 4.25)

    // For now, it's inexact
    const greatestDiff = Math.max(greatestDiffLat, greatestDiffLng);

    let zoomTo = ((diff) => {
      switch(true) {
        case diff <= 1:
          return 8;
        case diff <= 1.5:
          return 7;
        case diff <= 2:
          return 6.2;
        case diff <= 2.5:
          return 5.5;
        case diff <= 3:
          return 5.1;
        case diff <= 3.5:
          return 4.75;
        case diff <= 4:
          return 4.5
        case diff <= 4.5:
          return 4.25;
        case diff <= 5:
          return 4;
        default:
          return 3.75;
      }
    })(greatestDiff);

    const options = {
      center: [avgLng, avgLat],
      zoom: zoomTo,
      speed: 2,
    }

    this.renderMarkers(markersToAdd, options);
  }

  componentDidMount() {
    MapboxGl.accessToken = mapboxAPIKey;

    const mapInstance = new MapboxGl.Map({
      container: 'map',
      center: [4.626541, 28.582692],
      zoom: 1.5, // starting zoom
      minZoom: 1.5,
      style: 'mapbox://styles/ruthtown/cjy1zfey01ai51cp31xzhmwnw',
    });

    mapInstance.on('click', (e) => {
      const { addMarker, markers, editingItinerary } = this.props;

      if (editingItinerary || !markers.length) {
        const { nextMarkerId } = this.state;
        axios.get(`/api/marker/${e.lngLat.lat}/${e.lngLat.lng}/${MapboxGl.accessToken}`)
          .then((res) => (
            res.data.place_name
          ))
          .then((result) => {
            const newMarker = new MapboxGl.Marker()
              .setLngLat([e.lngLat.lng, e.lngLat.lat])
              .addTo(mapInstance);
            newMarker.marker_id = nextMarkerId;
            newMarker.placeName = result;
            newMarker.notes = '';
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


  // Check to see if any new markers need to be added & add them, set the next marker_id for the next potential marker
  componentDidUpdate() {
    const { markersToAdd, markers, searchCenter } = this.props;
    const { nextMarkerId } = this.state;

    if (markersToAdd.length !== 0) {
      this.calculateNewMapData(markersToAdd);
    }
    if (searchCenter.length) {
      this.mapFlyTo(searchCenter)
    }
    if (markers.length && (nextMarkerId !== 1 + markers[markers.length-1].marker_id)) {
      this.setState({
        nextMarkerId: 1 + markers[markers.length-1].marker_id
      })
    }
    if (!markers.length && nextMarkerId !== 1) {
      this.setState({ nextMarkerId: 1 })
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
