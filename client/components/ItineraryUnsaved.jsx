import React from 'react';
import { Link } from 'react-router-dom';

const ItineraryUnsaved = props => {
  let itineraryClasses = props.active ? 'active' : '';

  const placeholderSamples = [
    "Camino de Santiago 2020",
    "Banana Pancake Trail",
    "Andes Adventure, July",
    "The Final Frontier",
    "Northern Lights Tour 2021",
    "World Heritage Sites",
    "Reunion Trip 2020",
    "Road Trip Destinations",
    "Archaeological Sites of Interest",
    "Cheese Tour of Europe",
    "Cycling Abroad",
    "EcoTrek 2020",
    "Post-Conference Stops",
    "Architectural Wonders",
    "Famous Filming Locations",
    "Art Must-Sees",
    "Springtime Trek (next year)"
  ]

  let placeholderText = placeholderSamples[Math.round(Math.random() * 10)]

  return (
    <div className={itineraryClasses}>
      <ul>
        <input type="text" id="itineraryTitle" name="itineraryTitle" required
        minlength="4" maxlength="200" size="30" placeholder={"\"" + placeholderText + "\""} />
        <div className="itinerary">
          <ol>
            {props.markers.map((marker) => {
                return (
                  <li key={marker.id}>{marker.placeName}<button className="remove" onClick={()=>props.removeMarker(marker)}> x </button></li>
                )
            })}
          </ol>
          <button className="saveItinerary" onClick={props.toggleSaved}>Save</button>
        </div>
      </ul>
    </div>
  );
}

export default ItineraryUnsaved;
