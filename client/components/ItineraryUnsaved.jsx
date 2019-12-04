import React from 'react';
import { Link } from 'react-router-dom';

const ItineraryUnsaved = props => {
  let itineraryClasses = props.active ? 'active' : '';

  return (
    <div className={itineraryClasses}>
      <ul>
        <input type="text" id="itineraryTitle" name="itineraryTitle" required
        minlength="4" maxlength="200" size="30" placeholder="Give this itinerary a name..." />
        <div className="itinerary">
          <ol>
            {props.markers.map((marker) => {
                return (
                  <li key={marker.id}>{marker.placeName}<button className="remove" onClick={()=>props.removeMarker(marker)}> x </button></li>
                )
            })}
          </ol>
          <button className="saveMap" onClick={props.toggleSaved}>Save</button>
        </div>
      </ul>
    </div>
  );
}

export default ItineraryUnsaved;
