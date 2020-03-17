import React, { Component } from 'react';
import axios from 'axios';

export default class SavedItineraries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentListTitle: '',
      currentListMarkers: [],
      errorMsg: '',
      listClasses: 'saved',
      listDetailClasses: 'hidden',
    };
  }

  fetchListDetails = async (list) => {
    let currentListMarkers = [];
    try {
      const { data } = await axios.get(`/api/markers/${list.id}`);

      if (data) {
        currentListMarkers = data.sort((a, b) => a.markerOrder - b.markerOrder);
      }
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
    this.setState({
      listClasses: 'hidden saved',
      listDetailClasses: 'active',
      currentListTitle: list.title,
      currentListMarkers,
    })
  }

  handleHideList = () => {
    this.setState({
      listClasses: 'active saved',
      listDetailClasses: 'hidden',
      currentListTitle: '',
      currentListMarkers: [],
    })
  }

  render() {
    const {
      listClasses,
      listDetailClasses,
      currentListTitle,
      currentListMarkers,
      errorMsg
    } = this.state;

    const { lists } = this.props;

    return (
      <div className="saved-container">
        <div className={listClasses}>
          <h3>
            My Saved Itineraries
          </h3>
          <hr />
          <div className="itinerary overview">
            <ul>
              {lists && lists.map((list) => (
                <li key={list.id}>✈ <button type="button" className="itineraryButton" onClick={() => this.fetchListDetails(list)}>{list.title}</button></li>
              ))}
            </ul>
          </div>
        </div>
        <div className={listDetailClasses}>
          <ul>
            <p>{currentListTitle}</p>
            <div className="itinerary">
              <ol>
                {currentListMarkers && currentListMarkers.map((marker) => (
                  <li key={marker.id}>
                    <button type="button" className="remove" onClick={() => {}}>{marker.placeName}</button>
                  </li>
                ))}
              </ol>
              <div className="sidebarButtons">
                <button type="button" className="editItinerary" onClick={this.handleHideList}>Back</button>
                <button type="button" className="editItinerary" onClick={() => {}}>Edit</button>
              </div>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}
