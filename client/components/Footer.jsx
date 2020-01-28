import React from 'react';
import { Link } from 'react-router-dom';

const Footer = props => {
  return (
    <div className="footer notMain">
      <ul>
        <li>
          <h4>
            Search
            <input type="text" id="searchtext" name="searchtext" placeholder="Country, city, or zip code" required size="25"></input>
          </h4>
        </li>
        <li>
          <h4>
            <button className="toggleButton" onClick={props.toggleSidebar}>My Saved Maps</button>
          </h4>
        </li>
      </ul>
    </div>
  )
};

export default Footer;


// <li>
//   <h4>
//     <button className="clearMarkers" onClick={props.clearMap}>Clear Markers</button>
//   </h4>
// </li>
// <li>
//   <h4>
//     <button className="saveMap" onClick={props.saveMap}>Save This Map</button>
//   </h4>
// </li>
