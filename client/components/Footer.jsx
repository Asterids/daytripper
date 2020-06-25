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

const LoginButton = (props) => (
  <button type="button" className="toggleLogin" onClick={props.openLogin}>
    Login
  </button>
);

const SignupButton = (props) => (
  <button type="button" className="toggleLogin" onClick={props.openSignup}>
    Sign Up
  </button>
);

const MyMapsButton = (props) => (
  <button type="button" className="toggleButton" onClick={props.openSaved}>
    My Saved Maps
  </button>
);

const LogoutButton = (props) => (
  <button type="button" className="logout" onClick={props.logout}>
    Logout
  </button>
);

// Main Footer Component
const Footer = (props) => {
  const { isUserOnSession, openSaved, openLoginCard, openSignupCard, logout, handleSearchSubmit } = props;

  return (
    <div className="footer notMain">
      <ul>
        <li>
          <Search handleSearchSubmit={handleSearchSubmit} />
        </li>
        <li>
          <div></div>
        </li>
        <li>
          <h6>
            {
              isUserOnSession ? <MyMapsButton openSaved={openSaved} /> : <LoginButton openLogin={openLoginCard} />
            }
          </h6>
        </li>
        <li>
          <h6>
            {
              isUserOnSession ? <LogoutButton logout={logout} /> : <SignupButton openSignup={openSignupCard} />
            }
          </h6>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
