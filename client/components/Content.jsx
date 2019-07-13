import React from 'react';
import { Link } from 'react-router-dom';
import Map from './Map';

// stateless functional components HAVE NO THIS!

const Content = (props) => {

  return (
    <div id="content">
      <section>
        <h2 className="heading">Daytripper</h2>
      </section>
      <section>
        <Map />
      </section>
    </div>
  );
}

export default Content;
