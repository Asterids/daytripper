import React from 'react';

// Child Components
const Search = (props) => (
  <h4>
    Search
    <input
      type="text"
      id="searchtext"
      name="searchtext"
      placeholder="Country, city, or zip code"
      required
      size="25"
    />
  </h4>
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
  const { isUserOnSession, openSaved, openLoginCard, logout } = props;

  return (
    <div className="footer notMain">
      <ul>
        <li>
          <Search />
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
              isUserOnSession ? <LogoutButton logout={logout} /> : <SignupButton openSignup={openLoginCard} />
            }
          </h4>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
