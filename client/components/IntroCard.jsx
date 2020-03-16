import React from 'react';

const IntroCard = (props) => {
  const { introCardActive, openLoginCard, toggleIntroCard } = props;
  const classes = introCardActive ? 'introText active' : 'introText';

  return (
    <div className={classes}>
      <h3>
        <b>Welcome to DayTripper!</b>
      </h3>
      <h3>
        → Begin by adding markers to the map. You'll need to login if you want to start saving your lists.
      </h3>
      <h3>
        → You can <button type="button" className="greenLink" onClick={openLoginCard}>login as a guest</button> if you just want to see how things work!
      </h3>
      <button type="button" className="close secondaryButton" onClick={toggleIntroCard}>x</button>
    </div>
  );
}

export default IntroCard;
