import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // return the decoded token
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  loggedIn() {
    // return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check whether token is expired by comparing exp date to current
  isTokenExpired(token: string) {
    try {
      const tokenDecoded = jwtDecode<JwtPayload>(token);
      if (tokenDecoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        return tokenDecoded.exp < currentTime;
      }
      return false;
    } catch (error) {
      console.error(`You've been logged out due to inactivity.`, error);
      return true;
    }
  }

  // Get token from local storage
  getToken(): string {
    return localStorage.getItem(`id_token`) || '';
  }

  // set the token to localStorage
  login(idToken: string) {
    localStorage.setItem('id_token', idToken)
    window.location.assign('/'); 
  }

  // redirect to the login page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();