// npm packages
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

// our packages
import {MyPropType} from '../../util';

const createLink = ({label, link, isText}) => (isText ? (
  <Link to={link}><b>{label}</b></Link>
) : (
  <Link to={link}>{label}</Link>
));
createLink.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  isText: PropTypes.bool.isRequired,
};

const Navbar = ({user, current}) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">Brand</Link>
      </div>

      <ul className="nav navbar-nav">
        <li>
          {createLink({label: 'Browse questions', link: '/', isText: current === '/'})}
        </li>
        <li>
          {createLink({label: 'Create new questions', link: '/create', isText: current === '/create'})}
        </li>
      </ul>

      {
        user && (
          <ul className="nav navbar-nav navbar-right">
            <li>
              {createLink({
                label: `Logged in as "${user.login}"`,
                link: '/profile/me',
                isText: current === '/profile/me',
              })}
            </li>
          </ul>
      )}
    </div>
  </nav>
);
Navbar.propTypes = {
  // eslint-disable-next-line react/no-typos
  user: MyPropType.UserPropType,
  current: PropTypes.string.isRequired,
};
Navbar.defaultProps = {
  user: MyPropType.UserDefaultProp,
};

export default Navbar;
