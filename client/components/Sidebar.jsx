import React from 'react';
import { Link } from 'react-router-dom';
import ItinerarySaved from "./ItinerarySaved";
import ItineraryUnsaved from "./ItineraryUnsaved";

const Sidebar = props => {
  let sidebarClasses = props.active ? 'sidebar active notMain' : 'sidebar notMain';
  const {
    markers,
    editingItinerary,
    toggleSaved,
    isUserOnSession,
    openLoginCard,
    removeMarker,
    clearMap,
    saveMap,
  } = props;

  if (editingItinerary) {
    return (
    <div className={sidebarClasses}>
      <ItineraryUnsaved markers={markers}
        toggleSaved={toggleSaved}
        removeMarker={removeMarker}
        clearMap = {clearMap}
        saveMap = {saveMap}
        isUserOnSession={isUserOnSession}
        openLoginCard={openLoginCard}
      />
    </div>
    )
  }
  return (
    <div className={sidebarClasses}>
      <ItinerarySaved
        toggleSaved={toggleSaved}
      />
    </div>
  );
}

export default Sidebar;
