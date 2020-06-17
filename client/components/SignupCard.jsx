import React, { Component } from 'react';
import axios from 'axios';

export default class SignupCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
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

  signup = async (credentials) => {
    const { setUserOnState, closeSignupCard, getUserFromSession } = this.props;
    try {
      const { data } = await axios.post('/auth/local/signup', credentials);

      if (data) {
        this.setState({
          username: '',
          email: '',
          password: '',
          errorMsg: '',
        });

        closeSignupCard();
        getUserFromSession();
      }
    } catch (err) {
      console.error(err);
      if (err.message === 'Request failed with status code 400') {
        this.setState({ errorMsg: 'Invalid credentials! Please try again.' });
      } else {
        this.setState({ errorMsg: 'Oops, an error occurred!' });
      }
    }
  };

  handleSignup = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;

    this.signup({
      username,
      email,
      password,
    });

    this.setState({ password: '' });
  };

  switchToLogin = () => {
    const { openLoginCard } = this.props;
    this.setState({
      username: '',
      email: '',
      password: '',
      errorMsg: '',
    });
    openLoginCard();
  }


  render() {
    const { username, email, password, errorMsg } = this.state
    const { signupCardActive, closeSignupCard, openLoginCard } = this.props;
    const signupCardClasses = signupCardActive ? 'loginSignup active' : 'loginSignup';

    return (
      <div className={signupCardClasses}>
        <div className="loginDetails">
          <button type="button" className="close secondaryButton" onClick={closeSignupCard}>x</button>
          <h2 className="heading">Sign Up</h2>
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
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              value={email}
              onChange={this.handleChange}
              id="email"
              name="email"
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
            <button type="submit" id="submitLogin" onClick={this.handleSignup}>Create Account</button>
          </form>
          <a
            target="_self"
            href="/auth/google"
            className="googleLogin"
          >
            <button type="button" className="secondaryButton">Continue with Google</button>
          </a>
        </div>
        <p>
          Already have an account?
          <button type="button" className="greenLink" onClick={this.switchToLogin}>Login</button>
          to save your itineraries!
        </p>
      </div>
    );
  }
}
