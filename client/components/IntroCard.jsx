import React from 'react';

const IntroCard = (props) => {
  const active = true;
  const classes = active ? "introText active" : "introText";

  return (
    <div className="introText">
      <h3>
        Welcome to DayTripper!
      </h3>
      <h3>
        Begin by adding markers to the map. You'll need to login if you want to start saving your lists.
      </h3>
      <button type="button" className="close secondaryButton" onClick={() => !active}>x</button>
    </div>
  );
}

export default IntroCard;
