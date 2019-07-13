import React from 'react';
import { Link } from 'react-router-dom';

// stateless functional components HAVE NO THIS!

const Navbar = (props) => {

  return (
    <div id="navbar">
      <ul>
        <h4>
          <p>Search</p>
          <input type="text" id="searchtext" name="searchtext" placeholder="Country, city, or zip code" required size="25"></input>
        </h4>
        <h4>
          <p>Save</p>
        </h4>
        <h4>
          <p>Clear</p>
        </h4>
      </ul>
    </div>
  );
}

export default Navbar;
