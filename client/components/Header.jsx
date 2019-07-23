import React from 'react';
import { Link } from 'react-router-dom';

// stateless functional components HAVE NO THIS!

const Header = (props) => {

  return (
    <div className="header">
      <h2 className="heading">DayTripper</h2>
    </div>
  );
}

export default Header;
