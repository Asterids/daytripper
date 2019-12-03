import React from 'react';
import { Link } from 'react-router-dom';

const ItinerarySaved = props => {
  let itineraryClasses = props.active ? 'active' : '';

  return (
    <div className={itineraryClasses}>
      <h4>
        <p>Itinerary Saved Map Title</p>
      </h4>
    </div>
  );
}

export default ItinerarySaved;
