import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
const { toggleIntroCard } = props;

  return (
    <div className="header notMain">
      <button type="button" onClick={toggleIntroCard}>What is DayTripper?</button>
      <h2 className="heading">DayTripper</h2>
    </div>
  );
}

export default Header;
