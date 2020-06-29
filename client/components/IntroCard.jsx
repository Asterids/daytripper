import React from 'react';

const IntroCard = (props) => {
  const { introCardActive, openLoginCard, toggleIntroCard, isUserOnSession, currentUser } = props;
  const classes = introCardActive ? 'introText active' : 'introText';

  const handleOpenLogin = () => {
    openLoginCard();
    toggleIntroCard();
  }

  const introContentGuest = (
    <div className={classes}>
      <h6>
        <b>Welcome to DayTripper!</b>
      </h6>
      <h6>
        → Begin by adding markers to the map. You'll need to login if you want to start saving your lists.
      </h6>
      <h6>
        → You can <button type="button" className="greenLink" onClick={handleOpenLogin}>login as a guest</button> if you just want to see how things work!
      </h6>
      <button type="button" className="close secondaryButton" onClick={toggleIntroCard}>x</button>
    </div>
  );

  const introContentUser = (
    <div className={classes}>
      <h6>
        <b>Welcome to DayTripper, {currentUser.username}!</b>
      </h6>
      <h6>
        → Begin by clicking somewhere on the map to add a new marker.
      </h6>
      <h6>
        → Give your new list a title and add any relevant notes.
      </h6>
      <h6>
        → Once you've created a list and saved it, you can visit it anytime to view or edit it!
      </h6>
      <button type="button" className="close secondaryButton" onClick={toggleIntroCard}>x</button>
    </div>
  );

  return isUserOnSession ? introContentUser : introContentGuest;
}

export default IntroCard;
