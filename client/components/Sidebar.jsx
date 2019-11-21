import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = props => {
  let sidebarClasses = props.active ? 'sidebar active notMain' : 'sidebar notMain';

  return (
    <div className={sidebarClasses}>
      <ul>
        <h4>
          <p>Map Title</p>
        </h4>
        <div className="itinerary">
          <ol>
            {props.markers.map((marker, index) => {
                return (
                  <li key={index}>{ marker.placeName }</li>
                );
            })}
          </ol>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
