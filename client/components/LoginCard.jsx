import React, { Component } from 'react';
import axios from 'axios';

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
    const { setUserOnState, closeLoginCard, getUserFromSession } = this.props;
    try {
      const { data } = await axios.post('/auth/local/login', credentials);

      if (data) {
        setUserOnState(data.username);

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


  render() {
    const { username, password, errorMsg } = this.state
    const { loginCardActive, closeLoginCard } = this.props;
    const loginCardClasses = loginCardActive ? 'login active' : 'login';

    return (
      <div className={loginCardClasses}>
        <button type="button" className="close secondaryButton" onClick={closeLoginCard}>x</button>
        <h2 className="heading">Login</h2>
        {(
        !!errorMsg.length &&
        <p className="error">{errorMsg}</p>
        )}
        <div className="loginDetails">
          Username:
          <input
            type="text"
            value={username}
            onChange={this.handleChange}
            id="username"
            name="username"
            required
            size="20"
          />
          Password:
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
          <a
            target="_self"
            href="/auth/google"
            className="googleLogin"
          >
            <button type="button" className="secondaryButton">Continue with Google</button>
          </a>
        </div>
        <p>Don't have an account? <a href="" className="greenLink">Sign up</a> to save your itineraries!</p>
      </div>
    );
  }
}
