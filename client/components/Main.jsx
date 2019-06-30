import React, { Component } from 'react';
import Navbar from './Navbar';
import Content from './Content';

export default class Main extends Component {
  constructor(props) {
    super();

    this.state =  {};
  }

  render () {
    return (
      <div>
        <div>
            <Navbar />
        </div>
        <div>
            <Content />
        </div>
      </div>
    );
  }
}
