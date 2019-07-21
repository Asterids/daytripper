import React from 'react';
import { Link } from 'react-router-dom';

// stateless functional components HAVE NO THIS!

const Header = (props) => {

  return (
    <div id="header">
      <section>
        <h2 className="heading">Daytripper</h2>
      </section>
    </div>
  );
}

export default Header;
