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
    this.clearMap = this.clearMap.bind(this);
    this.addMarker = this.addMarker.bind(this);
  }

  toggleSidebar() {
    this.setState({
      sidebarActive: !this.state.sidebarActive
    })
  }

  addMarker(newMarker) {
    this.setState((prevState) => {
      return {markers: [prevState.markers, newMarker]};
    });
  }

  clearMap() {
    this.setState({markers: []})
  }

  // componentDidMount() {  // <-- look up lifecycle methods
  //   document.addEventListener('click', this.handleClick, false);
  // }
  //
  // toggleViewStatus(evt) {
  //   evt.stopPropagation();  // <-- look up
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   })
  // }


  render () {
    return (
      <div id="main">
        <Header />
        <Map markers={this.state.markers} addMarker={this.addMarker} />
        <Footer toggleSidebar={this.toggleSidebar} clearMap={this.clearMap} />
        <Sidebar active={this.state.sidebarActive} />
      </div>
    );
  }
}
