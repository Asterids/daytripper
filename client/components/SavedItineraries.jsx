import React, { Component } from 'react';
import axios from 'axios';

export default class SavedItineraries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMsg: '',
    };
  }

  render() {
    const { errorMsg } = this.state;
    const { lists } = this.props;

    return (
      <div className="saved">
        <h3>
          My Saved Itineraries
        </h3>
        <hr />
        <div className="itinerary">
          <ul>
            {lists && lists.map((list) => (
              <li key={list.id}><button type="button" className="remove" onClick={()=>{}}>{list.title}</button></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
