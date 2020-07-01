import React, { Component } from 'react';
import M from 'materialize-css';
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
      markersToAdd: [],
      markersToDelete: [],
      editingItinerary: false,
      isUserOnSession: false,
      currentUser: {},
      lists: [],
      errorMsg: '',
      searchCenter: [],
    };
  }

  //  --- MAP INTERACTION ---

  // add marker to state in editing view (user places a new marker on the map)
  addMarker = (newMarker, isEditing = true) => {
    this.setState((prevState) => ({
      sidebarActive: true,
      markers: [...prevState.markers, newMarker],
      editingItinerary: isEditing,
    }));
  }

  // add a marker to state in read-only view (viewing an existing saved itinerary)
  plotMarkers = (newMarkers) => {
    this.setState((prevState) => ({
      sidebarActive: true,
      markersToAdd: [...prevState.markersToAdd, ...newMarkers],
    }));
  }

  // delete a single marker from state
  removeMarker = (marker) => {
    marker.remove();
    this.setState((prevState) => ({
      markersToDelete: [...prevState.markersToDelete, marker.id],
      markers: [...prevState.markers.filter((elem) => elem !== marker)],
    }));
  }

  clearMarkersToAdd = () => { this.setState({ markersToAdd: [] }) };

  // clear the whole map of markers
  clearMap = () => {
    const { markers } = this.state;
    markers.forEach((marker) => marker.remove());
    this.setState({
      markers: [],
    });
  }

  // user must click to add a marker, but search can zoom to a location
  handleSearchSubmit = async (inputText) => {
    try {
      const { data } = await axios.get(`/api/search/${inputText}`);
      if (data.features.length) {
        const foundPlace = data.features[0].center;
        this.setState({ searchCenter: foundPlace })
      } else {
        M.toast({html: 'Hmm, we couldn&#39;t find that place!', classes: 'deep-orange lighten-2', displayLength: 2500});
      }
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
  }

  clearSearchCoords = () => this.setState({ searchCenter: [] });

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

  // Prepare the marker data & save - only want to save markers that don't already exist
  saveMarkers = async (listId) => {
    const { markers } = this.state;
    const markersPrepared = markers.filter(m => !m.id)
      .map((m) => (
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
      const savedMarkers = await axios.post(`/api/marker/save/${listId}`, { markersPrepared });
      return savedMarkers;
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
  }

  deleteMarkers = async (markerIds) => {
    try {
      for (const m of markerIds) {
        await axios.delete(`/api/marker/${m}`);
      }
      this.setState({ markersToDelete: [] })
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
  }

  // REFACTOR THIS - Messy and not DRY
  saveList = async (candidateList) => {
    const { lists, markersToDelete } = this.state;
    const userId = this.state.currentUser.id;
    const listId = candidateList.id;

    // if no list id then save as a new list, else handle list update
    if (!listId) {
      try {
        const { data } = await axios.post(`/api/lists/new/${userId}`, candidateList);
        if (data) {
          await this.saveMarkers(data.id);
          this.setState({
            lists: [...lists, data],
          });
          this.toggleSaved();
          M.toast({html: 'List added!', classes: 'teal accent-4', displayLength: 2000});
          return data;
        }
      } catch (err) {
        this.setState({ errorMsg: err.message });
      }
    } else {
      if (markersToDelete.length) {
        await this.deleteMarkers(markersToDelete);
      }
      try {
        const { data } = await axios.put(`/api/lists/update/${listId}`, candidateList);
        if (data) {
          await this.saveMarkers(data.id);
          this.toggleSaved();
          M.toast({html: 'List updated!', classes: 'teal accent-4', displayLength: 2000});
          return data;
        }
      } catch (err) {
        this.setState({ errorMsg: err.message });
      }
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
        introCardActive: false,
      }))
      .catch((err) => {
        this.setState({ errorMsg: 'Logout was unsuccessful.' })
      });
  }

  getSavedLists = async (userId) => {
    try {
      const { data } = await axios.get(`/api/lists/${userId}`);

      if (data) {
        this.setState({ lists: data })
      }
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
  }

  // if there are no markers on state,
  // open the sidebar with the My Saved Maps list view
  setUserOnState = (user) => {
    this.setState({
      isUserOnSession: true,
      currentUser: { id: user.id, username: user.username }
    });

    this.getSavedLists(user.id);

    if (this.state.introCardActive) {
      this.state.toggleIntroCard();
    }
  }

  getUserFromSession = async () => {
    const { loggedInUser } = this.state;

    const user = await axios.get('/auth/local/me');
    if (user.data.id) {
      this.setUserOnState(user.data);
    }
    return loggedInUser;
  };

  // check if a user is already on the session when the component mounts
  componentDidMount() {
    this.getUserFromSession();
  }

  render() {
    const {
      markers,
      markersToAdd,
      sidebarActive,
      editingItinerary,
      introCardActive,
      isUserOnSession,
      loginCardActive,
      signupCardActive,
      currentUser,
      lists,
      searchCenter,
      clearSearchCoords
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
          isUserOnSession={isUserOnSession}
          currentUser={currentUser}
        />
        <Map
          markers={markers}
          markersToAdd={markersToAdd}
          addMarker={this.addMarker}
          editingItinerary={editingItinerary}
          clearMarkersToAdd={this.clearMarkersToAdd}
          searchCenter={searchCenter}
          clearSearchCoords={this.clearSearchCoords}
        />
        <LoginCard
          loginCardActive={loginCardActive}
          closeLoginCard={this.closeLoginCard}
          openSignupCard={this.openSignupCard}
          getUserFromSession={this.getUserFromSession}
        />
        <SignupCard
          signupCardActive={signupCardActive}
          closeSignupCard={this.closeSignupCard}
          openLoginCard={this.openLoginCard}
          getUserFromSession={this.getUserFromSession}
        />
        <Footer
          isUserOnSession={isUserOnSession}
          openSaved={this.openSaved}
          openLoginCard={this.openLoginCard}
          openSignupCard={this.openSignupCard}
          logout={this.logout}
          handleSearchSubmit={this.handleSearchSubmit}
        />
        <Sidebar
          active={sidebarActive}
          markers={markers}
          addMarker={this.addMarker}
          plotMarkers={this.plotMarkers}
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
          getSavedLists={this.getSavedLists}
        />
      </div>
    );
  }
}
