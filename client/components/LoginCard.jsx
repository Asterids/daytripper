import React, { Component } from 'react';
import axios from 'axios';

const guestName = 'Guest';
const guestPass = 'CitizenOfTheWorld';

export default class LoginCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errorMsg: '',
    };
  }


  handleChange = (e) => {
    const { name } = e.target;

    this.setState({
      [name]: e.target.value,
    });
  }

  login = async (credentials) => {
    const { closeLoginCard, getUserFromSession } = this.props;
    try {
      const { data } = await axios.post('/auth/local/login', credentials);

      if (data) {
        this.setState({
          username: '',
          password: '',
          errorMsg: '',
        });

        closeLoginCard();
        getUserFromSession();
      }
    } catch (err) {
      console.error(err);
      // need to improve error handling here
      if (err.message === 'Request failed with status code 400') {
        this.setState({ errorMsg: 'Invalid login credentials! Please try again.' });
      } else {
        this.setState({ errorMsg: 'Oops, an error occurred!' });
      }
    }
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    this.login({
      username,
      password,
    });

    this.setState({ password: '' });
  };

  handleGuestLogin = (e) => {
    e.preventDefault();

    this.login({
      username: guestName,
      password: guestPass,
    });

    this.setState({ password: '' });
  }

  switchToSignup = () => {
    const { openSignupCard } = this.props
    this.setState({
      username: '',
      password: '',
      errorMsg: '',
    });
    openSignupCard();
  }

  handleClose = () => {
    const { closeLoginCard } = this.props;

    this.setState({
      username: '',
      password: '',
      errorMsg: '',
    });
    closeLoginCard();
  }


  // NOTE: Should also add <fieldset> tags to all form elements for accessibility
  render() {
    const { username, password, errorMsg } = this.state
    const { loginCardActive } = this.props;
    const loginCardClasses = loginCardActive ? 'loginSignup active' : 'loginSignup';

    return (
      <div className={loginCardClasses}>
        <div className="loginDetails">
          <button type="button" className="close secondaryButton" onClick={this.handleClose}>x</button>
          <h2 className="heading">Login</h2>
          {(
          !!errorMsg.length
          && <p className="error">{errorMsg}</p>
          )}
          <form>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              value={username}
              onChange={this.handleChange}
              id="username"
              name="username"
              required
              size="20"
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              value={password}
              onChange={this.handleChange}
              id="password"
              name="password"
              required
              size="20"
            />
            <button type="submit" id="submitLogin" onClick={this.handleLogin}>Submit</button>
          </form>
        </div>
        <a
            target="_self"
            href="/auth/google"
            className="googleLogin"
          >
            <button type="button" className="secondaryButton">Continue with Google</button>
        </a>
        <button type="submit" className="secondaryButton" id="submitGuestLogin" onClick={this.handleGuestLogin}>Login as Guest</button>
        <p>
          Don't have an account?
          <button type="button" className="greenLink" onClick={this.switchToSignup}>Sign up</button>
          to save your itineraries!
        </p>
      </div>
    );
  }
}
