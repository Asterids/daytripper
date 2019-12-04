import React, { Component } from 'react';
import Header from './Header';
import Map from './Map';
import Sidebar from './Sidebar';
import Footer from './Footer';
import axios from 'axios';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      sidebarActive: false,
      markers: [],
      isSaveMap: false
    };

    this.saveMap = this.saveMap.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.clearMap = this.clearMap.bind(this);
    this.toggleSaved = this.toggleSaved.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
  }

  saveMap() {
    this.setState({
      sidebarActive: true,
      isSaveMap: true
    })
    console.log(this.state.isSaveMap)
  }

  toggleSaved() {
    this.setState({
      isSaveMap: !this.state.isSaveMap
    })
  }

  toggleSidebar() {
    this.setState({
      sidebarActive: !this.state.sidebarActive
    })
  }

  addMarker(newMarker, tkn) {
    const longitude = newMarker._lngLat.lng
    const latitude = newMarker._lngLat.lat

    axios.get(`/api/marker/${latitude}/${longitude}/${tkn}`)
        .then(res => {
            newMarker.placeName = res.data.place_name
         })
         .then(this.setState((prevState) => {
           return {markers: [...prevState.markers, newMarker]};
         }));
  }

  removeMarker(marker) {
    marker.remove();
    this.setState((prevState) => {
      return {
        markers: [...prevState.markers.filter(elem => elem !== marker)]
      }
    })
  }


  clearMap() {
    this.setState({
      sidebarActive: false,
      markers: []
    })
  }

  render () {
    return (
      <div id="main">
        <Header />
        <Map markers={this.state.markers}
             addMarker={this.addMarker}
             clearMap={this.clearMap}
        />
        <Footer saveMap={this.saveMap}
                toggleSidebar={this.toggleSidebar}
                clearMap={this.clearMap}
        />
        <Sidebar active={this.state.sidebarActive}
                 markers={this.state.markers}
                 isSaveMap={this.state.isSaveMap}
                 toggleSaved={this.toggleSaved}
                 removeMarker={this.removeMarker}
        />
      </div>
    );
  }
}
