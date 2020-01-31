import React from 'react';

const LoginCard = (props) => {

  const { loginCardActive } = props;
  const loginCardClasses = loginCardActive ? 'login active' : 'login';

  return (
    <div className={loginCardClasses}>
    <h2 className="heading">Login To Save</h2>
      <div className="loginDetails">
        Username:
        <input
          type="text"
          id="username"
          name="username"
          required
          size="20"
        />
        Password:
        <input
          type="password"
          id="password"
          name="password"
          required
          size="20"
        />
        <button type="submit">Submit</button>
        <a
          target="_self"
          href="/auth/google"
          className="googleLogin"
        >
          <button type="button">Login with Google</button>
        </a>
      </div>
    </div>
  );
};

// <i className="fa fa-google" />

export default LoginCard;
