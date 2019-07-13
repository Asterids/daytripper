import React from 'react';
import { Link } from 'react-router-dom';
import Map from './Map';

// stateless functional components HAVE NO THIS!

const Content = (props) => {

  return (
    <div id="content">
      <h2 className="heading">Daytripper</h2>
      <section>
        <Map />
      </section>
    </div>
  );
}

export default Content;
