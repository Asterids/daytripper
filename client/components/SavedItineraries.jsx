import React from 'react';

const SavedItineraries = (props) => {

  const handleEditClick = () => {
    const { toggleSaved } = props;
    toggleSaved();
  }

  const handleClose = () => {
    const { toggleSidebar, resetToAllLists } = props;
    toggleSidebar();
    resetToAllLists();
  }

  const {
    lists,
    listClasses,
    listDetailClasses,
    currentListId,
    currentListTitle,
    currentListNotes,
    currentListMarkers,
    fetchListDetails,
    handleDeleteList,
    resetToAllLists,
    errorMsg,
  } = props;

  return (
    <div className="saved-container">
      <button type="button" className="close secondaryButton" onClick={handleClose}>x</button>
      <div className={listClasses}>
        <h5 className="list-header">
          My Saved Itineraries
        </h5>
        <hr />
        <div className="itinerary overview">
          <ul>
            {!lists.length && (<p>You don't have any saved lists! Click to place a marker on the map and begin a new list.</p>)}
            {!!lists.length && lists.map((list) => (
              <li key={list.id}>✈ <button type="button" className="itineraryButton" onClick={() => fetchListDetails(list)}>{list.title}</button></li>
            ))}
          </ul>
        </div>
      </div>
      <div className={listDetailClasses}>
        <h5 className="strong-header">{currentListTitle}</h5>
        <hr />
          <div className="itinerary">
            <ol>
              {currentListMarkers && currentListMarkers.map((marker) => (
                <li key={marker.id}>
                  <button type="button" className="remove" onClick={() => {}}>{marker.placeName}</button>
                </li>
              ))}
            </ol>
            <h6 className="strong-header">Notes:</h6>
            <br />
            {currentListNotes}
            <div className="sidebarButtons">
              <button type="button" className="editItinerary" onClick={resetToAllLists}>Back</button>
              {
                <button type="button" className="editItinerary" onClick={handleEditClick}>Edit</button>
              }
            </div>
            <button type="button" className="editItinerary" onClick={() => handleDeleteList(currentListId)}>Delete List</button>
          </div>
      </div>
    </div>
  );
}

export default SavedItineraries;