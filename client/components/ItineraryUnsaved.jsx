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
      active,
      openLoginCard,
      isUserOnSession,
      currentUser,
      markers,
      removeMarker,
      saveMap
    } = this.props;

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
                  <li key={marker.marker_id}>{marker.placeName}<button className="remove" onClick={()=>removeMarker(marker)}> x </button></li>
                );
              })}
            </ol>
            <input
              type="text"
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
