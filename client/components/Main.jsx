import React, { Component } from 'react';
import Navbar from './Navbar'

export default class Main extends Component {
  constructor(props) {
    super();

    this.state =  {};
  }

  render () {
    return (
      <div>
          <Navbar />
      </div>
    );
  }
}
