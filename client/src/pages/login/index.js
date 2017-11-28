// npm packages
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {push} from 'react-router-redux';

// our packages
import {loginAction} from '../../store/actions';
import {loginErrorToMessage} from '../../util';

const mapStateToProps = state => ({
  token: state.auth.token,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  navToHome: () => dispatch(push('/')),
  onLoginClick: params => dispatch(loginAction(params)),
});

const Login = ({
  onLoginClick, token, navToHome, error,
}) => {
  let usernameInput;
  let passwordInput;
  let rememberInput;

  const handleClick = (e) => {
    e.preventDefault();

    onLoginClick({
      login: usernameInput.value,
      password: passwordInput.value,
      remember: rememberInput.checked === 'on',
    });
  };

  if (token) {
    // TODO: figure out a better way to do nav
    setImmediate(() => navToHome());
  }


  return (
    <div className="jumbotron">
      <h2>Experts portal:</h2>
      <p>Please log in. Or <Link to="/register">register</Link></p>

      {
        error && Object.keys(error).length > 0 ? (
          <div className="alert alert-danger" role="alert">{loginErrorToMessage(error)}</div>
        ) : ''
      }

      <form>
        <div className="form-group">
          <label htmlFor="inputUsername">Username:</label>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            placeholder="Username"
            ref={(i) => { usernameInput = i; }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Password"
            ref={(i) => { passwordInput = i; }}
          />
        </div>
        <div className="checkbox">
          <label htmlFor="inputRemember">
            <input
              type="checkbox"
              id="inputRemember"
              ref={(i) => { rememberInput = i; }}
            /> Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-default" onClick={handleClick}>Login</button>
      </form>
    </div>
  );
};
Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  navToHome: PropTypes.func.isRequired,
  token: PropTypes.string,
  error: PropTypes.shape({message: PropTypes.string}),
};
Login.defaultProps = {
  token: '',
  error: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
