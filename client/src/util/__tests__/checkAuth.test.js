/* global test, expect */

import {isAuthenticated} from '../checkAuth';

test('# isAuthenticated', () => {
  expect(isAuthenticated()).toBeUndefined();
});
