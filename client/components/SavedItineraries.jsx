import React, { Component } from 'react';
import axios from 'axios';

export default class SavedItineraries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedLists: [],
      errorMsg: '',
    };
  }

  // if new user has logged in, fetch their saved lists
  componentDidUpdate(prevProps) {
    const { isUserOnSession, currentUser } = this.props;

    if (prevProps.currentUser.id !== currentUser.id) {
      if (isUserOnSession) {
        this.getUserLists(currentUser.id);
      }
    }
  }

  getUserLists = async (userId) => {
    try {
      const { data } = await axios.get(`/api/lists/${userId}`);

      if (data) {
        this.setState({ savedLists: data })
      }
    } catch (err) {
      console.error(err);
      this.setState({ errorMsg: err.message });
    }
  };

  render() {
    const { savedLists, errorMsg } = this.state;

    return (
      <div className="saved">
        <h3>
          My Saved Itineraries
        </h3>
        <hr />
        <div className="itinerary">
          <ul>
            {savedLists.map((list) => (
              <li key={list.id}><button type="button" className="remove" onClick={()=>{}}>{list.title}</button></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
