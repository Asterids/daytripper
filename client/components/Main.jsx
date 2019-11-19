import React, { Component } from 'react';
import Header from './Header';
import Map from './Map';
import Sidebar from './Sidebar';
import Footer from './Footer';

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

  addMarker(newMarker) {
    this.setState((prevState) => {
      return {markers: [...prevState.markers, newMarker]};
    });
    console.log("PARENT STATE MARKERS: ")
    console.log(this.state.markers)
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
