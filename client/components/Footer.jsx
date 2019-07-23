import React from 'react';
import { Link } from 'react-router-dom';

// stateless functional components HAVE NO THIS!

const Footer = (props) => {

  return (
    <div className="footer">
      <ul>
        <li>
          <h4>
            Search
            <input type="text" id="searchtext" name="searchtext" placeholder="Country, city, or zip code" required size="25"></input>
          </h4>
        </li>
        <li>
          <h4>
            <a href="">Add A Marker</a>
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

export default Footer;
