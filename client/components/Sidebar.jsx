import React from 'react';
import { Link } from 'react-router-dom';
import SavedItineraries from "./SavedItineraries";
import ItineraryUnsaved from "./ItineraryUnsaved";

const Sidebar = (props) => {
  const {
    active,
    markers,
    addMarker,
    editingItinerary,
    toggleSaved,
    toggleSidebar,
    isUserOnSession,
    currentUser,
    openLoginCard,
    removeMarker,
    clearMap,
    saveMap,
    lists,
  } = props;

  const sidebarClasses = active ? 'sidebar active notMain' : 'sidebar notMain';

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

  if (editingItinerary) {
    return (
      <div className={sidebarClasses}>
        <ItineraryUnsaved
          placeholderText={placeholderText}
          markers={markers}
          toggleSaved={toggleSaved}
          toggleSidebar={toggleSidebar}
          removeMarker={removeMarker}
          clearMap={clearMap}
          saveMap={saveMap}
          isUserOnSession={isUserOnSession}
          currentUser={currentUser}
          openLoginCard={openLoginCard}
        />
      </div>
    );
  }
  return (
    <div className={sidebarClasses}>
      <SavedItineraries
        isUserOnSession={isUserOnSession}
        currentUser={currentUser}
        toggleSaved={toggleSaved}
        lists={lists}
        clearMap={clearMap}
        addMarker={addMarker}
      />
    </div>
  );
};

export default Sidebar;
