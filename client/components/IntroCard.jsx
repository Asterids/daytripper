import React from 'react';

const IntroCard = (props) => {
  const { introCardActive, toggleIntroCard } = props;
  const classes = introCardActive ? 'introText active' : 'introText';

  return (
    <div className={classes}>
      <h3>
        Welcome to DayTripper!
      </h3>
      <h3>
        Begin by adding markers to the map. You'll need to login if you want to start saving your lists.
      </h3>
      <button type="button" className="close secondaryButton" onClick={toggleIntroCard}>x</button>
    </div>
  );
}

export default IntroCard;
