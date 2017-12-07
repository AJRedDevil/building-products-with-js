import {isAuthenticated} from '../checkAuth';

test('# checkAuth', () => {
  const token = 'test';
  expect(isAuthenticated()).toBeUndefined();

  localStorage.setItem('user.token', token);
  expect(isAuthenticated()).toBe(token);
});
