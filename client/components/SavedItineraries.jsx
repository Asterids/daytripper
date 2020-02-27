import React, { Component } from 'react';
import axios from 'axios';

export default class SavedItineraries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMsg: '',
    };
  }

  componentDidUpdate() {
    const { isUserOnSession, loggedInUser } = this.props;
    if (isUserOnSession) {
      console.log(loggedInUser)
      // call getUserLists with the userId
      // this.getUserLists(loggedInUser);
    }
  }

  getUserLists = async (userId) => {
    try {
      const { data } = await axios.get(`/api/lists/${userId}`);

      if (data) {
        console.log('Data!! ', data) // NOTE: Not seeing Data
      }
    } catch (err) {
      console.error(err);
      this.setState({ errorMsg: err.message });
    }
  };

  render() {
    const { errorMsg } = this.state;
    const { active } = this.props;
    const itineraryClasses = active ? 'active' : '';

    return (
      <div className={itineraryClasses}>
        <h3>
          My Saved Itineraries
        </h3>
        <hr />
        <div className="itinerary">
          <ul>
            <li><button type="button" className="remove" onClick={()=>{}}>Banana Pancake Trail 2021</button></li>
          </ul>
        </div>
      </div>
    );
  }
}
