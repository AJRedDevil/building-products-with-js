import React from 'react';
// import enzyme methods
import Enzyme, {shallow, render, mount} from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
// import complete rxjs
import 'rxjs';

// React 16 Enzyme Adaptor
Enzyme.configure({adapter: new Adaptor()});

// setup localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', {value: localStorageMock});

// setup React
global.React = React;
// setup enzyme
global.shallow = shallow;
global.render = render;
global.mount = mount;
// Skip createElement warnings but fail tests on any other warning
// eslint-disable-next-line no-console
console.error = (message) => {
  if (!/(React.createElement: type should not be null)/.test(message)) {
    throw new Error(message);
  }
};
