import React, { Component } from 'react';

// Child Components
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { inputText } = this.state;
    this.props.handleSearchSubmit(inputText);
  }

  render() {
    const { inputText } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="search-text">Search:</label>
          <input
            type="text"
            id="search-text"
            name="search-text"
            color="white"
            placeholder="Country, city, or zip code"
            required
            size="25"
            onChange={this.handleChange}
            value={inputText}
          />
          <input type="submit" hidden ></input>
      </form>
  )}
}

const UserIsLoggedInButtons = (props) => (
  <div id="user-buttons">
    <button type="button" className="toggleButton" onClick={props.openSaved}>
      My Saved Maps
    </button>
    <button type="button" className="logout" onClick={props.logout}>
      Logout
    </button>
  </div>
)

const NoUserButtons = (props) => (
  <div>
    <button type="button" className="toggleLogin" onClick={props.openLogin}>
      Login
    </button>
    <button type="button" className="toggleLogin" onClick={props.openSignup}>
      Sign Up
    </button>
  </div>
)

// Main Footer Component
const Footer = (props) => {
  const { isUserOnSession, openSaved, openLoginCard, openSignupCard, logout, handleSearchSubmit } = props;

  return (
    <div className="footer notMain">
      <Search handleSearchSubmit={handleSearchSubmit} />
      <div>
        {
          isUserOnSession ? <UserIsLoggedInButtons openSaved={openSaved} logout={logout} /> : <NoUserButtons openLogin={openLoginCard} openSignup={openSignupCard} />
        }
      </div>
    </div>
  );
};

export default Footer;
