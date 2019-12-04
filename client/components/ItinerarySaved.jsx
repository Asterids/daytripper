import React from 'react';
import { Link } from 'react-router-dom';

const ItinerarySaved = props => {
  let itineraryClasses = props.active ? 'active' : '';

  return (
    <div className={itineraryClasses}>
      <h4>
        <p>Itinerary Saved Map Title</p>
      </h4>
      <div className="itinerary">
        <ol>
          <li>Madrid, Madrid, Spain</li>
          <li>Valencia, Valencia Province, Spain</li>
          <li>Barcelona, Barcelona Province, Spain</li>
          <li>Marseille, France</li>
          <li>Lyon, France</li>
          <li>Geneva, Switzerland</li>
        </ol>
        <button className="editMap" onClick={props.toggleSaved}>Edit</button>
      </div>
    </div>
  );
}

export default ItinerarySaved;
