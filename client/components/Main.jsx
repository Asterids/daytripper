import React, { Component } from 'react';
import Header from './Header';
import Map from './Map';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default class Main extends Component {
  constructor(props) {
    super();

    this.state =  {};
  }

  render () {
    return (
      <div id="main">
        <Header />
        <Map />
        <Footer />
      </div>
    );
  }
}
