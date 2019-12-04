import React from 'react';
import { Link } from 'react-router-dom';
import ItinerarySaved from "./ItinerarySaved";
import ItineraryUnsaved from "./ItineraryUnsaved";

const Sidebar = props => {
  let sidebarClasses = props.active ? 'sidebar active notMain' : 'sidebar notMain';
  const isSaveMap = props.isSaveMap;

  if (isSaveMap) {
    return (
    <div className={sidebarClasses}>
      <ItineraryUnsaved markers={props.markers}
            toggleSaved={props.toggleSaved}
            removeMarker={props.removeMarker}
      />
    </div>
  )}
  return (
    <div className={sidebarClasses}>
      <ItinerarySaved toggleSaved={props.toggleSaved} />
    </div>
  );

  // return (
  //   <div className={sidebarClasses}>
  //     <ul>
  //       <h4>
  //         <p>Map Title</p>
  //       </h4>
  //       <div className="itinerary">
  //         <ol>
  //           {props.markers.map((marker, index) => {
  //               return (
  //                 <li key={index}>{ marker.placeName }</li>
  //               );
  //           })}
  //         </ol>
  //       </div>
  //     </ul>
  //   </div>
  // );
}

export default Sidebar;
