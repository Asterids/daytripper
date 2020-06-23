import React, { Component } from 'react';
import axios from 'axios';

const { Marker } = require('mapbox-gl');

export default class SavedItineraries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentListId: 0,
      currentListTitle: '',
      currentListNotes: '',
      currentListMarkers: [],
      errorMsg: '',
      listClasses: 'saved',
      listDetailClasses: 'hidden',
    };
  }

  fetchListDetails = async (list) => {
    const { clearMap, plotMarker } = this.props;
    clearMap();
    let currentListMarkers = [];
    try {
      const { data } = await axios.get(`/api/markers/${list.id}`);

      if (data) {
        currentListMarkers = data.sort((a, b) => a.markerOrder - b.markerOrder);
        currentListMarkers.forEach((marker) => {
          plotMarker(marker); // add it to Main.js state to be rendered on the map
        });
      }
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
    this.setState({
      listClasses: 'hidden saved',
      listDetailClasses: 'active',
      currentListTitle: list.title,
      currentListNotes: list.notes,
      currentListMarkers,
    });
  }

  resetToAllLists = () => {
    this.setState({
      currentListId: 0,
      listClasses: 'active saved',
      listDetailClasses: 'hidden',
      currentListTitle: '',
      currentListMarkers: [],
      currentListNotes: '',
    });
    this.props.clearMap();
  }

  handleEditClick = () => {
    const { toggleSaved } = this.props;
    toggleSaved();
  }

  handleDeleteList = async (list) => {
    try {
      const { data } = await axios.delete(`/api/lists/${list.id}`);
      console.log("Delete {data}: ", data)
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
    this.resetToAllLists();
  }

  handleClose = () => {
    const { toggleSidebar } = this.props;
    toggleSidebar();
    this.resetToAllLists();
  }

  render() {
    const {
      listClasses,
      listDetailClasses,
      currentListTitle,
      currentListNotes,
      currentListMarkers,
      errorMsg,
    } = this.state;

    const { lists } = this.props;

    return (
      <div className="saved-container">
        <button type="button" className="close secondaryButton" onClick={this.handleClose}>x</button>
        <div className={listClasses}>
          <h3>
            My Saved Itineraries
          </h3>
          <hr />
          <div className="itinerary overview">
            <ul>
              {!lists.length && (<p>You don't have any saved lists! Click to place a marker on the map and begin a new list.</p>)}
              {!!lists.length && lists.map((list) => (
                <li key={list.id}>✈ <button type="button" className="itineraryButton" onClick={() => this.fetchListDetails(list)}>{list.title}</button></li>
              ))}
            </ul>
          </div>
        </div>
        <div className={listDetailClasses}>
          <ul>
            {currentListTitle}
            <div className="itinerary">
              <ol>
                {currentListMarkers && currentListMarkers.map((marker) => (
                  <li key={marker.id}>
                    <button type="button" className="remove" onClick={() => {}}>{marker.placeName}</button>
                  </li>
                ))}
              </ol>
              <p>
                <b>Notes:</b>
                <br />
                {currentListNotes}
              </p>
              <div className="sidebarButtons">
                <button type="button" className="editItinerary" onClick={this.resetToAllLists}>Back</button>
                {
                  <button type="button" className="editItinerary" onClick={this.handleEditClick}>Edit</button>
                }
              </div>
              <button type="button" className="editItinerary" onClick={() => this.handleDeleteList(list)}>Delete List</button>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}
