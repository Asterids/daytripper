import React, { Component } from 'react';
import axios from 'axios';

export default class LoginCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }


  handleChange = (e) => {
    const { name } = e.target;

    this.setState({
      [name]: e.target.value,
    });
  }

  login = async (credentials) => {
    const { setUser } = this.props;
    const { data } = await axios.post('/auth/local/login', credentials);

    setUser(data.username);
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { closeLoginCard } = this.props;

    this.login({
      username,
      password,
    });

    this.setState({
      username: '',
      password: '',
    });

    closeLoginCard();
  };


  render() {
    const { username, password } = this.state
    const { loginCardActive, closeLoginCard } = this.props;
    const loginCardClasses = loginCardActive ? 'login active' : 'login';

    return (
      <div className={loginCardClasses}>
        <button type="button" className="close secondaryButton" onClick={closeLoginCard}>x</button>
        <h2 className="heading">Login</h2>
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
