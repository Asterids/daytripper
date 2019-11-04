import React, { Component } from 'react';
import Header from './Header';
import Map from './Map';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      sidebarActive: false
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState({
      sidebarActive: !this.state.sidebarActive
    })
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
        <Map />
        <Footer toggleSidebar={this.toggleSidebar} />
        <Sidebar active={this.state.sidebarActive} />
      </div>
    );
  }
}
