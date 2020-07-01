import React, { Component } from 'react';
import axios from 'axios';

export default class SignupCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirmPass: '',
      errorMsg: '',
    };
  }


  handleChange = (e) => {
    const { name } = e.target;

    this.setState({
      [name]: e.target.value,
      errorMsg: '',
    });
  }

  signup = async (credentials) => {
    const { closeSignupCard, getUserFromSession } = this.props;
    try {
      const { data } = await axios.post('/auth/local/signup', credentials);

      if (data) {
        this.setState({
          username: '',
          password: '',
          confirmPass: '',
          errorMsg: '',
        });

        closeSignupCard();
        getUserFromSession();
      }
    } catch (err) {
      console.error(err);
      if (err.message === 'Request failed with status code 400') {
        this.setState({ errorMsg: 'Sorry, this username already exists. Please choose a different one.' });
      } else {
        this.setState({ errorMsg: 'Oops, an error occurred!' });
      }
    }
  };

  handleSignup = async (e) => {
    e.preventDefault();
    const { username, password, confirmPass } = this.state;

    if (confirmPass === password) {
      const user = await this.signup({
        username,
        password,
      });

      if (user) {
        this.setState({ password: '', confirmPass: '' });
      }
    } else {
      this.setState({ errorMsg: 'Please make sure both passwords match' })
    }
  };

  switchToLogin = () => {
    const { openLoginCard } = this.props;
    this.setState({
      username: '',
      password: '',
      errorMsg: '',
    });
    openLoginCard();
  }


  render() {
    const { username, password, confirmPass, errorMsg } = this.state
    const { signupCardActive, closeSignupCard } = this.props;
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
            <label htmlFor="confirmPass">Confirm Password:</label>
            <input
              type="password"
              value={confirmPass}
              onChange={this.handleChange}
              id="confirmPass"
              name="confirmPass"
              required
              size="20"
            />
            <button type="submit" id="submitLogin" onClick={this.handleSignup}>Create Account</button>
          </form>
        </div>
        <a
          target="_self"
          href="/auth/google"
          className="googleLogin"
        >
          <button type="button" className="secondaryButton">Continue with Google</button>
        </a>
        <p>
          Already have an account?
          <button type="button" className="greenLink" onClick={this.switchToLogin}>Login</button>
          to save your itineraries!
        </p>
      </div>
    );
  }
}
