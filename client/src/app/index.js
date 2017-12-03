// npm packages
import React from 'react';
import PropTypes from 'prop-types';

// our packages
import Footer from '../components/footer';

const App = ({children}) => (
  <div className="container">
    {children}
    <Footer />
  </div>
);
App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
