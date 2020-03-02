import React from 'react';
import { Link } from 'react-router-dom';
import SavedItineraries from "./SavedItineraries";
import ItineraryUnsaved from "./ItineraryUnsaved";

const Sidebar = props => {
  let sidebarClasses = props.active ? 'sidebar active notMain' : 'sidebar notMain';
  const {
    markers,
    editingItinerary,
    toggleSaved,
    isUserOnSession,
    currentUser,
    openLoginCard,
    removeMarker,
    clearMap,
    saveMap,
    lists,
  } = props;

  if (editingItinerary) {
    return (
    <div className={sidebarClasses}>
      <ItineraryUnsaved
        markers={markers}
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
      <SavedItineraries
        isUserOnSession={isUserOnSession}
        currentUser={currentUser}
        toggleSaved={toggleSaved}
        lists={lists}
      />
    </div>
  );
}

export default Sidebar;
