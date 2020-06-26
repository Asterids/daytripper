import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SavedItineraries from './SavedItineraries';
import ItineraryUnsaved from './ItineraryUnsaved';
import axios from 'axios';


export default class Sidebar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentListId: 0,
      currentListTitle: '',
      currentListNotes: '',
      currentListMarkers: [],
      errorMsg: '',
      listClasses: 'saved',
      listDetailClasses: 'hidden detail',
    };
  }

  fetchListDetails = async (list) => {
    const { clearMap, plotMarkers } = this.props;
    const listId = list.id
    clearMap();
    let currentListMarkers = [];
    try {
      const { data } = await axios.get(`/api/markers/${listId}`);

      if (data) {
        currentListMarkers = data.sort((a, b) => a.markerOrder - b.markerOrder);
        plotMarkers(currentListMarkers); // add them to Main.js state to be rendered on the map
      }
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
    this.setState({
      listClasses: 'hidden saved',
      listDetailClasses: 'active detail',
      currentListId: listId,
      currentListTitle: list.title,
      currentListNotes: list.notes,
      currentListMarkers,
    });
  }

  resetToAllLists = () => {
    this.setState({
      currentListId: 0,
      listClasses: 'active saved',
      listDetailClasses: 'hidden detail',
      currentListTitle: '',
      currentListMarkers: [],
      currentListNotes: '',
    });
    this.props.clearMap();
  }

  handleDeleteList = async (listId) => {
    const confirmed = confirm("Are you sure you want to delete this list?");
    if (confirmed) {
      try {
        const { status }  = await axios.delete(`/api/lists/${listId}`);
        if (status === 204) {
          M.toast({html: 'List deleted!', classes: 'success green lighten-2', displayLength: 2500});
        }
      } catch (err) {
        this.setState({ errorMsg: err.message });
      }
      this.resetToAllLists();
    }
  }

  generateText = (dataset) => {
    const num = (1 + Math.floor(Math.random() * (dataset.length)));
    return dataset[num - 1];
  }

  render() {
    const {
      markers,
      addMarker,
      plotMarker,
      editingItinerary,
      toggleSaved,
      toggleSidebar,
      isUserOnSession,
      currentUser,
      openLoginCard,
      removeMarker,
      clearMap,
      saveMap,
      lists,
    } = this.props;

    const {
      currentListId,
      currentListTitle,
      currentListNotes,
      currentListMarkers,
      listClasses,
      listDetailClasses,
    } = this.state;

    const sidebarClasses = this.props.active ? 'sidebar active notMain' : 'sidebar notMain';

    const placeholderSamples = [
      'Camino de Santiago 2020', 'Banana Pancake Trail', 'Andes Adventure, July',
      'The Final Frontier', 'Northern Lights Tour 2021', 'World Heritage Sites',
      'Reunion Trip 2020', 'Road Trip Destinations', 'Archaeological Sites of Interest',
      'Cheese Tour of Europe', 'Cycling Abroad', 'EcoTrek 2020',
      'Post-Conference Stops', 'Architectural Wonders', 'Famous Filming Locations',
      'Art Must-Sees', 'Springtime Trek (next year)',
    ];

    const placeholderText = this.generateText(placeholderSamples);

    if (editingItinerary) {
      return (
        <div className={sidebarClasses}>
          <ItineraryUnsaved
            placeholderText={placeholderText}
            markers={markers}
            resetToAllLists={this.resetToAllLists}
            toggleSaved={toggleSaved}
            toggleSidebar={toggleSidebar}
            removeMarker={removeMarker}
            clearMap={clearMap}
            saveMap={saveMap}
            isUserOnSession={isUserOnSession}
            currentUser={currentUser}
            openLoginCard={openLoginCard}
            currentListId={currentListId}
            currentListTitle={currentListTitle}
            currentListNotes={currentListNotes}
          />
        </div>
      );
    }
    return (
      <div className={sidebarClasses}>
        <SavedItineraries
          isUserOnSession={isUserOnSession}
          currentUser={currentUser}
          toggleSaved={toggleSaved}
          toggleSidebar={toggleSidebar}
          lists={lists}
          listClasses={listClasses}
          listDetailClasses={listDetailClasses}
          currentListId={currentListId}
          currentListTitle={currentListTitle}
          currentListNotes={currentListNotes}
          currentListMarkers={currentListMarkers}
          resetToAllLists={this.resetToAllLists}
          clearMap={clearMap}
          addMarker={addMarker}
          plotMarker={plotMarker}
          fetchListDetails={this.fetchListDetails}
          handleDeleteList={this.handleDeleteList}
        />
      </div>
    );
  }
};
