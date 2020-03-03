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
      <div>
        <div className={listClasses}>
          <h3>
            My Saved Itineraries
          </h3>
          <hr />
          <div className="itinerary">
            <ul>
              {lists && lists.map((list) => (
                <li key={list.id}><button type="button" className="remove" onClick={() => this.fetchListDetails(list)}>{list.title}</button></li>
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
                  <li key={marker.id}><button type="button" className="remove" onClick={() => {}}>{marker.placeName}</button></li>
                ))}
              </ol>
              <div className="sidebarButtons">
                <button type="button" className="editItinerary" onClick={() => {}}>Edit</button>
              </div>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}
