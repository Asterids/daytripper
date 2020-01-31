import React from 'react';
import { Link } from 'react-router-dom';

const ItineraryUnsaved = (props) => {
  const { toggleSaved, active, openLoginCard, isUserOnSession, markers, removeMarker, clearMap } = props;
  const itineraryClasses = active ? 'active' : '';

  const placeholderSamples = [
    'Camino de Santiago 2020', 'Banana Pancake Trail', 'Andes Adventure, July',
    'The Final Frontier', 'Northern Lights Tour 2021', 'World Heritage Sites',
    'Reunion Trip 2020', 'Road Trip Destinations', 'Archaeological Sites of Interest',
    'Cheese Tour of Europe', 'Cycling Abroad', 'EcoTrek 2020',
    'Post-Conference Stops', 'Architectural Wonders', 'Famous Filming Locations',
    'Art Must-Sees', 'Springtime Trek (next year)',
  ];

  function generateText(dataset) {
    const num = (1 + Math.floor(Math.random() * (dataset.length)));
    return dataset[num - 1];
  }

  const placeholderText = generateText(placeholderSamples);

  const saveButtonNoUser = (
    <button type="button" className="openLoginCard" onClick={openLoginCard}>Save</button>
  );
  const saveButtonWithUser = (
    <button type="button" className="saveItinerary" onClick={toggleSaved}>Save</button>
  );

  return (
    <div className={itineraryClasses}>
      <ul>
        <input
          type="text"
          id="itineraryTitle"
          name="itineraryTitle"
          required
          minLength="4"
          maxLength="200"
          size="30"
          placeholder={`"${placeholderText}"`}
        />
        <div className="itinerary">
          <ol>
            {markers.map((marker) => {
                return (
                  <li key={marker.id}>{marker.placeName}<button className="remove" onClick={()=>removeMarker(marker)}> x </button></li>
                )
            })}
          </ol>
          <div className="sidebarButtons">
            <button className="saveItinerary" onClick={clearMap}>Clear</button>
            {isUserOnSession ? saveButtonWithUser : saveButtonNoUser}
          </div>
        </div>
      </ul>
    </div>
  );
}

// <a
//   target="_self"
//   href="/auth/google"
//   className="btn btn-social btn-google">
//   <i className="fa fa-google" />
//   <span>{message} with Google</span>
// </a>

export default ItineraryUnsaved;
