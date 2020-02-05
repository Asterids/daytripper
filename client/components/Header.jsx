import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
const { toggleIntroCard, isUserOnSession, loggedInUser } = props;

  return (
    <div className="header notMain">
      <button type="button" onClick={toggleIntroCard}>What is DayTripper?</button>
      <h2 className="heading">DayTripper</h2>
      {isUserOnSession && <h3 className="heading welcome">Welcome, {loggedInUser}!</h3>}
    </div>
  );
};

export default Header;
