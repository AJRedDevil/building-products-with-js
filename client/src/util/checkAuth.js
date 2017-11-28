const key = 'user.token';

export const isAuthenticated = () => localStorage.getItem(key);
