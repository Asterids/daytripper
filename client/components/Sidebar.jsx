import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = props => {
  let sidebarClasses = props.active ? 'sidebar active notMain' : 'sidebar notMain';

  return (
    <div className={sidebarClasses}>
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
