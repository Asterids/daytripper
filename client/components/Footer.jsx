import React from 'react';

// Child Components
const Search = (props) => (
  <form onSubmit={(inputText) => props.handleSearchSubmit(inputText)}>
      <h4>
      <label for="search-text">Search:</label>
        <input
          type="text"
          id="search-text"
          name="search-text"
          placeholder="Country, city, or zip code"
          required
          size="25"
        />
        <input type="submit" hidden ></input>
      </h4>
  </form>
);

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
          <h4>
            {
              isUserOnSession ? <MyMapsButton openSaved={openSaved} /> : <LoginButton openLogin={openLoginCard} />
            }
          </h4>
        </li>
        <li>
          <h4>
            {
              isUserOnSession ? <LogoutButton logout={logout} /> : <SignupButton openSignup={openSignupCard} />
            }
          </h4>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
