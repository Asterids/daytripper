import React from 'react';
import { Link } from 'react-router-dom';

const SingleItinerary = (props) => {
  const itineraryClasses = props.active ? 'active' : '';
  const { loggedInUser } = props;

  getUserData = () => {

  }

  return (
    <div className={itineraryClasses}>
      <ul>
        <li>
          <h3>
            Reunion Trip 2020
          </h3>
          <hr />
          <div className="itinerary">
            <ol>
              <li>Madrid, Madrid, Spain</li>
              <li>Valencia, Valencia Province, Spain</li>
              <li>Barcelona, Barcelona Province, Spain</li>
              <li>Marseille, France</li>
            </ol>
            <button className="editMap" onClick={props.toggleSaved}>Edit</button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SingleItinerary;
