import React from 'react';
import { Link } from 'react-router-dom';

// stateless functional components HAVE NO THIS!

const Navbar = (props) => {

  return (
    <div id="navbar">
      <ul>
        <li>
          <h4>
            Search
            <input type="text" id="searchtext" name="searchtext" placeholder="Country, city, or zip code" required size="25"></input>
          </h4>
        </li>
        <li>
          <h4>
            <a href="">Clear Markers</a>
          </h4>
        </li>
        <li>
          <h4>
            <a href="">Save This Map</a>
          </h4>
        </li>
        <li>
          <h4>
            <a href="">My Saved Maps</a>
          </h4>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
