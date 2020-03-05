import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import IntroCard from './IntroCard';
import Map from './Map';
import Sidebar from './Sidebar';
import Footer from './Footer';
import LoginCard from './LoginCard';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarActive: false,
      loginCardActive: false,
      introCardActive: false,
      markers: [],
      editingItinerary: false,
      isUserOnSession: false,
      currentUser: {},
      lists: [],
      errorMsg: '',
    };
  }

  // check if a user is already on the session when the component mounts
  componentDidMount() {
    this.getUserFromSession();
  }

  // Consideration for persisting new markers through login -
  // utilize session for temporary storage of new markers when a user is not yet logged in?

  //  --- MAP INTERACTION ---

  addMarker = (newMarker) => {
    this.setState((prevState) => ({
      sidebarActive: true,
      markers: [...prevState.markers, newMarker],
      editingItinerary: true, // Should be controlling user intent independently of marker creation
    }));
  }

  removeMarker = (marker) => {
    marker.remove();
    this.setState((prevState) => ({
      markers: [...prevState.markers.filter((elem) => elem !== marker)],
    }));
  }

  clearMap = () => {
    const { markers } = this.state;
    markers.forEach((marker) => marker.remove());
    this.setState({
      sidebarActive: false,
      markers: [],
    });
  }

  // --- SURROUNDING PAGE INTERACTION ---

  // toggles sidebar 'active' class
  toggleSidebar = () => {
    const { sidebarActive } = this.state;

    this.setState({
      sidebarActive: !sidebarActive,
    });
  }

  // opens the sidebar with the saved (read-only) view
  openSaved = () => {
    this.setState({
      sidebarActive: true,
      editingItinerary: false,
    });
  }

  // toggles between saved (read-only) and unsaved (editable) itinerary components in sidebar
  toggleSaved = () => {
    const { editingItinerary } = this.state;

    this.setState({
      editingItinerary: !editingItinerary,
    });
  }

  // saves the markers corresponding with a given list
  saveMarkers = async (listId) => {
    const { markers } = this.state
    // Prepare the data - only want to send the relevant data points to the db
    const markersPrepared = markers.map((m) => (
      {
        markerOrder: m.marker_id,
        placeName: m.placeName,
        latitude: m._lngLat.lat,
        longitude: m._lngLat.lng,
        notes: m.notes,
        parentList: listId,
      }
    ));
    try {
      const { data } = await axios.post(`/api/marker/save/${listId}`, { markersPrepared });
      if (data) {
        this.setState({
          markers: data,
        });
      }
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
  }

 // saves a list with details, and calls saveMarkers to save the related markers
  saveList = async (newList) => {
    const userId = this.state.currentUser.id;
    const { lists, markers } = this.state;
    try {
      const { data } = await axios.post(`/api/lists/new/${userId}`, newList);
      if (data) {
        this.saveMarkers(data.id);
        this.setState({
          lists: [...lists, data],
        });
        this.toggleSaved();
      }
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
  }

  toggleIntroCard = () => {
    const { introCardActive } = this.state;

    this.setState({
      introCardActive: !introCardActive,
    });
  }

  openLoginCard = () => {
    this.setState({
      loginCardActive: true,
    });
  }

  closeLoginCard = () => {
    this.setState({
      loginCardActive: false,
    });
  }

  // --- AUTHENTICATION ---

  logout = () => {
    axios.delete('/auth/local/logout')
      .then(() => this.setState({
        isUserOnSession: false,
        currentUser: {},
      }))
      .catch((err) => {
        this.setState({ errorMsg: 'Logout was unsuccessful.' })
      });

    this.clearMap();
  }

  setUserOnState = async (user) => {
    let savedLists = [];
    try {
      const { data } = await axios.get(`/api/lists/${user.id}`);

      if (data) {
        savedLists = data;
      }
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }

    this.setState({
      isUserOnSession: true,
      currentUser: { id: user.id, username: user.username },
      lists: savedLists,
    });
  }

  getUserFromSession = async () => {
    const { loggedInUser } = this.state;

    const user = await axios.get('/auth/local/me');
    if (user.data.id) {
      this.setUserOnState(user.data);
    }
    return loggedInUser;
  };

  render() {
    const {
      markers,
      sidebarActive,
      editingItinerary,
      introCardActive,
      isUserOnSession,
      loginCardActive,
      currentUser,
      lists,
    } = this.state;

    return (
      <div id="main">
        <Header
          toggleIntroCard={this.toggleIntroCard}
          isUserOnSession={isUserOnSession}
          currentUser={currentUser}
        />
        <IntroCard
          introCardActive={introCardActive}
          toggleIntroCard={this.toggleIntroCard}
        />
        <Map
          markers={markers}
          addMarker={this.addMarker}
        />
        <LoginCard
          loginCardActive={loginCardActive}
          closeLoginCard={this.closeLoginCard}
          setUserOnState={this.setUserOnState}
          getUserFromSession={this.getUserFromSession}
        />
        <Footer
          isUserOnSession={isUserOnSession}
          openSaved={this.openSaved}
          openLoginCard={this.openLoginCard}
          logout={this.logout}
        />
        <Sidebar
          active={sidebarActive}
          markers={markers}
          editingItinerary={editingItinerary}
          toggleSaved={this.toggleSaved}
          removeMarker={this.removeMarker}
          clearMap={this.clearMap}
          saveMap={this.saveList}
          isUserOnSession={isUserOnSession}
          currentUser={currentUser}
          lists={lists}
          openLoginCard={this.openLoginCard}
        />
      </div>
    );
  }
}
