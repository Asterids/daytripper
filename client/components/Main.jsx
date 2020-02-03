import React, { Component } from 'react';
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
    };
  }

  // placeholder for saving a given itinerary -
  // needs logic to save the markers in state to the session store
  saveMap = () => {
    this.setState({});
  }

  // toggles between saved (read-only) and unsaved (editable) itinerary components in sidebar
  toggleSaved = () => {
    const { editingItinerary } = this.state;

    this.setState({
      editingItinerary: !editingItinerary,
    });
  }

  // toggles sidebar 'active' class
  toggleSidebar = () => {
    const { sidebarActive } = this.state;

    this.setState({
      sidebarActive: !sidebarActive,
    });
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

  // opens the sidebar with the saved (read-only) view
  openSaved = () => {
    this.setState({
      sidebarActive: true,
      editingItinerary: false,
    });
  }

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

  render() {
    const {
      markers,
      sidebarActive,
      editingItinerary,
      introCardActive,
      isUserOnSession,
      loginCardActive,
    } = this.state;

    return (
      <div id="main">
        <Header toggleIntroCard={this.toggleIntroCard} />
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
        />
        <Footer
          isUserOnSession={isUserOnSession}
          openSaved={this.openSaved}
          openLoginCard={this.openLoginCard}
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
          openLoginCard={this.openLoginCard}
        />
      </div>
    );
  }
}
