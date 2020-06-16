import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import IntroCard from './IntroCard';
import Map from './Map';
import Sidebar from './Sidebar';
import Footer from './Footer';
import LoginCard from './LoginCard';
import SignupCard from './SignupCard';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarActive: false,
      loginCardActive: false,
      signupCardActive: false,
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

  // add marker to state in editing view (user places a new marker on the map)
  addMarker = (newMarker) => {
    this.setState((prevState) => ({
      sidebarActive: true,
      markers: [...prevState.markers, newMarker],
      editingItinerary: true,
    }));
  }

  // add a marker to state in read-only view (viewing an existing saved itinerary)
  plotMarker = (newMarker) => {
    this.setState((prevState) => ({
      sidebarActive: true,
      markers: [...prevState.markers, newMarker],
    }));
    console.log("New Marker: ", newMarker)
  }

  // delete a single marker from state
  removeMarker = (marker) => {
    marker.remove();
    this.setState((prevState) => ({
      markers: [...prevState.markers.filter((elem) => elem !== marker)],
    }));
  }

  // clear the whole map of markers
  clearMap = () => {
    const { markers } = this.state;
    markers.forEach((marker) => marker.remove());
    this.setState({
      markers: [],
    });
  }

  // --- SURROUNDING PAGE INTERACTION ---

  // toggles sidebar 'active' class (controls visibility)
  toggleSidebar = () => {
    const { sidebarActive } = this.state;
    if (sidebarActive) {
      this.clearMap();
    }

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

  // RENAME TO "saveNewMarkers" - ?
  // saves the markers corresponding with a given list
  saveMarkers = async (listId) => {
    const { markers } = this.state;
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
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
  }

  // RENAME TO "saveNewList"
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

  // Need to add logic for deleting markers from DB if they were removed from the list
  updateList = async (list) => {
    const listId = list.id;
    const { lists, markers } = this.state;
    try {
      const { data } = await axios.put(`/api/lists/save/${listId}`, list);
      if (data) {
        this.updateMarkers(listId);
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

  openLoginCard = () => this.setState({ loginCardActive: true, signupCardActive: false });

  closeLoginCard = () => this.setState({ loginCardActive: false });

  openSignupCard = () => this.setState({ loginCardActive: false, signupCardActive: true });

  closeSignupCard = () => this.setState({ signupCardActive: false });

  // --- AUTHENTICATION ---

  logout = () => {
    this.clearMap();

    axios.delete('/auth/local/logout')
      .then(() => this.setState({
        sidebarActive: false,
        isUserOnSession: false,
        currentUser: {},
      }))
      .catch((err) => {
        this.setState({ errorMsg: 'Logout was unsuccessful.' })
      });
  }

  // if there are no markers on state,
  // open the sidebar with the My Saved Maps list view
  setUserOnState = async (user) => {
    let savedLists = [];
    try {
      const { data } = await axios.get(`/api/lists/${user.id}`);

      if (data) {
        savedLists = data; // saved lists view should have an empty state that says
      } // "You have no saved lists!" or similar
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
      signupCardActive,
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
          openLoginCard={this.openLoginCard}
        />
        <Map
          markers={markers}
          addMarker={this.addMarker}
          editingItinerary={editingItinerary}
        />
        <LoginCard
          loginCardActive={loginCardActive}
          closeLoginCard={this.closeLoginCard}
          openSignupCard={this.openSignupCard}
          setUserOnState={this.setUserOnState}
          getUserFromSession={this.getUserFromSession}
        />
        <SignupCard
          signupCardActive={signupCardActive}
          closeSignupCard={this.closeSignupCard}
          openLoginCard={this.openLoginCard}
          setUserOnState={this.setUserOnState}
          getUserFromSession={this.getUserFromSession}
        />
        <Footer
          isUserOnSession={isUserOnSession}
          openSaved={this.openSaved}
          openLoginCard={this.openLoginCard}
          openSignupCard={this.openSignupCard}
          logout={this.logout}
        />
        <Sidebar
          active={sidebarActive}
          markers={markers}
          addMarker={this.addMarker}
          plotMarker={this.plotMarker}
          editingItinerary={editingItinerary}
          toggleSaved={this.toggleSaved}
          toggleSidebar={this.toggleSidebar}
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
