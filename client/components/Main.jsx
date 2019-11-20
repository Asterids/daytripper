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

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.clearMap = this.clearMap.bind(this);
    this.clearMarkersFromState = this.clearMarkersFromState.bind(this);
  }

  toggleSidebar() {
    this.setState({
      sidebarActive: !this.state.sidebarActive
    })
  }

  addMarker(newMarker, tkn) {
    const longitude = newMarker._lngLat.lng
    const latitude = newMarker._lngLat.lat

    this.setState((prevState) => {
      return {markers: [...prevState.markers, newMarker]};
    });

    axios.get(`/api/marker/${latitude}/${longitude}/${tkn}`)
        .then(res => {
            console.log("MARKER PLACED ON: ")
            console.log(res.data.place_name);
            // return res.json()
         })
  }

  clearMap() {
    this.setState({markers: []})
  }

  clearMarkersFromState() {
    // this.setState({markers: []})
  }


  render () {
    return (
      <div id="main">
        <Header />
        <Map markers={this.state.markers}
             addMarker={this.addMarker}
             clearMap={this.clearMap}
             clearMarkersFromState={this.clearMarkersFromState}
        />
        <Footer toggleSidebar={this.toggleSidebar} clearMap={this.clearMap} />
        <Sidebar active={this.state.sidebarActive} />
      </div>
    );
  }
}
