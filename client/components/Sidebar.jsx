import React from 'react';
import { Component, Link } from 'react-router-dom';

class Sidebar extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      isOpen: false
    };
    // this.toggleViewStatus = this.toggleView.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  };

  render() {

    return (
      <div id="sidebar">
        <ul>
          <h4>
            <p>Trip Name</p>
          </h4>
          <h4>
            <p>Pins</p>
          </h4>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
