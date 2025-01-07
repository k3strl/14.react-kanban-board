import { JwtPayload, jwtDecode } from 'jwt-decode';


class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired


  }

  getToken(): string {
    // TODO: return the token
  return localStorage.getItem(`id_token`) || '';

  }

  login(idToken: string) {
    localStorage.setItem('')
    // TODO: set the token to localStorage
    // TODO: redirect to the home page


  }

  logout() {
    // remove the token from localStorage
    localStorage.removeItem('id_token');
    // redirect to the login page
    window.location.assign('/login'); // Redirect to login page
  }
}

export default new AuthService();
