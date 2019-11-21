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
      markers: []
    };

    this.saveMap = this.saveMap.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.clearMap = this.clearMap.bind(this);
  }

  saveMap() {
    this.setState({
      sidebarActive: true
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
        />
      </div>
    );
  }
}
