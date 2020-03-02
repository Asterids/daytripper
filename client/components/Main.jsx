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
      editingItinerary: true,
    }));
  }

  removeMarker = (marker) => {
    marker.remove();
    this.setState((prevState) => ({
      markers: [...prevState.markers.filter((elem) => elem !== marker)],
    }));
  }

  clearMap = () => {
    this.setState({
      sidebarActive: false,
      markers: [],
    });
  }

  // --- ENVIRONMENTAL INTERACTION ---

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

  // placeholder for saving a given itinerary -
  // needs logic to save the markers in state to the session store
  saveMap = () => {
    this.setState({});
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
      .catch((err) => console.error('Logging out was unsuccesful', err));

    this.clearMap();
  }

  setUserOnState = (user) => {
    this.setState({
      isUserOnSession: true,
      currentUser: { id: user.id, username: user.username },
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
          saveMap={this.saveMap}
          isUserOnSession={isUserOnSession}
          currentUser={currentUser}
          openLoginCard={this.openLoginCard}
        />
      </div>
    );
  }
}
