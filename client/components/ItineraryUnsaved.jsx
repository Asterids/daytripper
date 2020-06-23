import React, { Component } from 'react';

export default class ItineraryUnsaved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentListTitle: '',
      currentListNotes: '',
      errorMsg: '',
    };
  }

  componentDidMount() {
    const { markers, addMarker } = this.props;
    if (markers.length) {
      // if markers on state exist when sidebar is loaded, need to set the title and notes
    }
  }

  handleChange = (e) => {
    const { name } = e.target;

    if (name === 'currentListTitle') {
      this.setState({
        [name]: e.target.value,
        errorMsg: '',
      })
    } else {
      this.setState({
        [name]: e.target.value,
      });
    }
  }

  handleClose = () => {
    const { toggleSidebar } = this.props;
    this.setState({
      currentListTitle: '',
      currentListNotes: '',
    });
    toggleSidebar();
  }

  handleSubmitSave = () => {
    const listDetails = {
      title: this.state.currentListTitle.trim(),
      notes: this.state.currentListNotes,
    };

    if (!listDetails.title.length) {
      this.setState({ errorMsg: 'Please add a title in order to save your list!' })
    } else {
      this.props.saveMap(listDetails);
    }
  }

  render() {
    const { currentListTitle, currentListNotes, errorMsg } = this.state;
    const {
      placeholderText,
      active,
      openLoginCard,
      isUserOnSession,
      currentUser,
      markers,
      removeMarker,
      clearMap,
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
          <h5 id="titleHeading">Name this list:</h5>
          <button type="button" className="close secondaryButton" onClick={this.handleClose}>x</button>
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
          <p>
            <h4 className="error">{errorMsg}</h4>
          </p>
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
              <button type="button" className="saveItinerary" onClick={clearMap}>Clear</button>
              {isUserOnSession ? saveButtonWithUser : saveButtonNoUser}
            </div>
          </div>
        </ul>
      </div>
    );
  }
}
