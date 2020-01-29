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
      markers: [],
      editingItinerary: false
    };

    this.saveMap = this.saveMap.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.clearMap = this.clearMap.bind(this);
    this.toggleSaved = this.toggleSaved.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
    this.openSaved = this.openSaved.bind(this);
  }

// placeholder for saving a given itinerary -
// needs logic to save the markers in state to the session store
  saveMap() {
    this.setState({})
  }

// toggles between saved (read-only) and unsaved (editable) itinerary components in sidebar
  toggleSaved() {
    this.setState({
      editingItinerary: !this.state.editingItinerary
    })
  }

// toggles sidebar 'active' class
  toggleSidebar() {
    this.setState({
      sidebarActive: !this.state.sidebarActive
    })
  }

// opens the sidebar with the saved (read-only) view
  openSaved() {
    this.setState({
      sidebarActive: true,
      editingItinerary: false
    })
  }

  addMarker(newMarker) {
    this.setState((prevState) => {
       return {
         sidebarActive: true,
         markers: [...prevState.markers, newMarker],
         editingItinerary: true
       };
     })
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
        />
        <Footer openSaved={this.openSaved} />
        <Sidebar active={this.state.sidebarActive}
                 markers={this.state.markers}
                 editingItinerary={this.state.editingItinerary}
                 toggleSaved={this.toggleSaved}
                 removeMarker={this.removeMarker}
                 clearMap={this.clearMap}
                 saveMap={this.saveMap}
        />
      </div>
    );
  }
}
