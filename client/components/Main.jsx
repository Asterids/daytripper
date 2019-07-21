import React, { Component } from 'react';
import Navbar from './Navbar';
import Content from './Content';
import Sidebar from './Sidebar';

export default class Main extends Component {
  constructor(props) {
    super();

    this.state =  {};
  }

  render () {
    return (
      <div>
        <Content />
        <Navbar />
      </div>
    );
  }
}
