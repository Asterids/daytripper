import React, { Component } from 'react';

export default class ItineraryUnsaved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentListTitle: '',
      currentListNotes: '',
    };
  }

  clearMapAndSidebar = () => {
    const { clearMap } = this.props;
    this.setState({
      currentListTitle: '',
      currentListNotes: '',
    });
    clearMap();
  }

  handleChange = (e) => {
    const { name } = e.target;

    this.setState({
      [name]: e.target.value,
    });
  }

  render() {
    const { currentListTitle, currentListNotes } = this.state;
    const {
      placeholderText,
      active,
      openLoginCard,
      isUserOnSession,
      currentUser,
      markers,
      removeMarker,
      saveMap,
    } = this.props;

    const itineraryClasses = active ? 'active' : '';

    const listDetails = {
      title: this.state.currentListTitle,
      notes: this.state.currentListNotes,
    };

    const saveButtonNoUser = (
      <button type="button" className="openLoginCard" onClick={openLoginCard}>Login to Save</button>
    );
    const saveButtonWithUser = (
      <button type="button" className="saveItinerary" onClick={() => { saveMap(listDetails); }}>Save</button>
    );

    return (
      <div className={itineraryClasses}>
        <ul>
          <h5 id="titleHeading">Name this list:</h5>
          <input
            type="text"
            id="currentListTitle"
            name="currentListTitle"
            onChange={this.handleChange}
            value={currentListTitle}
            required
            minLength="4"
            maxLength="200"
            size="30"
            placeholder={`"${placeholderText}"`}
          />
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
              id="currentListNotes"
              name="currentListNotes"
              onChange={this.handleChange}
              value={currentListNotes}
              required
              minLength="4"
              maxLength="600"
              size="60"
              placeholder="Any notes about this list..."
            />
            <div className="sidebarButtons">
              <button type="button" className="saveItinerary" onClick={this.clearMapAndSidebar}>Clear</button>
              {isUserOnSession ? saveButtonWithUser : saveButtonNoUser}
            </div>
          </div>
        </ul>
      </div>
    );
  }
}
