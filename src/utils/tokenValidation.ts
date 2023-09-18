import jwtDecode from 'jwt-decode';

/**
 * Validates access token is valid or invalid
 * @param {authToken} authToken must be a string
 * @returns Authorization Token is invalid or invalid
 */
export const isOktaTokenValid = async (authToken: string) => {
  if (!authToken || jwtDecode<any>(authToken)?.exp < (Math.floor(new Date().getTime() / 1000))) {
    return false;
  }
  return true;
};
export default {
  isOktaTokenValid,
};
