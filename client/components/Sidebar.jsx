import React from 'react';
import { Link } from 'react-router-dom';

// stateless functional components HAVE NO THIS!

const Sidebar = (props) => {

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

export default Sidebar;
