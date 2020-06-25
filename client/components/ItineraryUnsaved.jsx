import React, { Component } from 'react';
import { render } from 'react-dom';


export default class ItineraryUnsaved extends Component {
  constructor (props) {
    super(props)

    this.state = { errorMsg: '' }

    this.titleInput = React.createRef();
    this.notesInput = React.createRef();
  }

  handleChange = (e) => {
    if (this.state.errorMsg.length) {
      this.setState({ errorMsg: '' })
    }
  }

  handleSubmitSave = (e) => {
    const { saveMap, currentListId } = this.props;

    const listDetails = {
      title: this.titleInput.value.trim(),
      notes: this.notesInput.value.trim(),
    };

    if (currentListId) {
      listDetails.id = currentListId
    }

    if (!listDetails.title.length) {
      this.setState({ errorMsg: 'Please add a title in order to save your list!' })
    } else {
      saveMap(listDetails);
    }
  }

  handleCancel = () => {
    const { resetToAllLists, toggleSaved } = this.props;
    resetToAllLists();
    toggleSaved();
  }

  handleClose = () => {
    const { toggleSidebar } = this.props;
    toggleSidebar();
  }

  render() {
    const { errorMsg } = this.state;

    const {
      placeholderText,
      active,
      openLoginCard,
      isUserOnSession,
      markers,
      removeMarker,
      clearMap,
      currentListTitle,
      currentListNotes,
      currentListId,
    } = this.props;
  
    const itineraryClasses = active ? 'active' : '';

    const saveButtonNoUser = (
      <button type="button" className="openLoginCard" onClick={openLoginCard}>Login to Save</button>
    );
    const saveButtonWithUser = (
      <button type="button" className="saveItinerary" onClick={this.handleSubmitSave}>Save</button>
    );

    return (
      <div className={itineraryClasses}>
        <ul>
          <h6 id="titleHeading">List title:</h6>
          <button type="button" className="close secondaryButton" onClick={this.handleClose}>x</button>
          <input
            type="text"
            id="unsavedTitle"
            name="unsavedTitle"
            defaultValue={currentListTitle}
            ref={unsavedTitle => this.titleInput = unsavedTitle}
            onChange={this.handleChange}
            required
            minLength="4"
            maxLength="200"
            size="30"
            placeholder={`"${placeholderText}"`}
          />
          <section>
            <p className="error">{errorMsg}</p>
          </section>
          <div className="itinerary">
            <ol>
              {markers && markers.map((marker) => {
                return (
                  <li key={marker.marker_id}>
                    {marker.placeName}
                    <button type="button" className="remove" onClick={() => removeMarker(marker)}> x </button>
                  </li>
                );
              })}
            </ol>
            <textarea
              id="unsavedNotes"
              name="unsavedNotes"
              defaultValue={currentListNotes}
              ref={unsavedNotes => this.notesInput = unsavedNotes}
              required
              minLength="4"
              maxLength="600"
              size="60"
              placeholder="Any notes about this list..."
            />
            <div className="sidebarButtons">
              {!!currentListId && <button type="button" className="editItinerary" onClick={this.handleCancel}>Cancel</button>}
              {!currentListId && <button type="button" className="saveItinerary" onClick={clearMap}>Clear</button>}
              {isUserOnSession ? saveButtonWithUser : saveButtonNoUser}
            </div>
          </div>
        </ul>
      </div>
    );
  }
}
