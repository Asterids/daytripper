import React from 'react';
import { Link } from 'react-router-dom';

// stateless functional components HAVE NO THIS!

const Navbar = (props) => {

  return (
    <div id="navbar">
      <section>
        <h4>
          <p>LIONS</p>
        </h4>
      </section>
      <section>
        <h4>
          <p>TIGERS</p>
        </h4>
      </section>
      <section>
        <h4>
          <p>BEARS</p>
        </h4>
      </section>
    </div>
  );
}

export default Navbar;
