import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl';
import axios from 'axios';
// import SVG from 'react-inlinesvg';

// const Icon = () => <SVG src='../../public/images/marker-15.svg' />;
const token = require('../../secrets')

export default class Map extends Component {
  constructor(props) {
    super(props);

    const { markers } = this.props

    this.state = {
      map: {},
      markers
    }
  }

  componentDidMount() {
    const { addMarker } = this.props;

    MapboxGl.accessToken = token;

    const mapInstance = new MapboxGl.Map({
      container: 'map',
      center: [4.626541, 28.582692],
      zoom: 1.5, // starting zoom
      style: 'mapbox://styles/ruthtown/cjy1zfey01ai51cp31xzhmwnw',
    });

    // *** Implement & test when markers are persistent/saveable to DB

    // mapInstance.on('load', function (markers) {
    //   markers.forEach(marker => {
    //     let existingMarker = new MapboxGl.Marker()
    //       .setLngLat(marker._lngLat.lng, marker._lngLat.lat)
    //       .addTo(mapInstance)
    //
    //     addMarker(existingMarker)
    //   })
    // }

    let counter = 0;

    mapInstance.on('click', (e) => {
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
    });

    this.setState({ map: mapInstance });
  }

  // need to change to getDerivedStateFromProps or else prepend with UNSAFE_
  componentWillReceiveProps(props) {
    if (props.markers.length > this.state.markers.length) {
      this.setState({markers: [...props.markers]})
    } else if ((props.markers.length === 0) && !(this.state.markers.length === 0)) {
      this.state.markers.forEach(marker => {
        marker.remove();
      })
      this.setState({ markers: [] });
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
