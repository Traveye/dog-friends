import decode from 'jwt-decode';

class AuthService {
  getProfile() {
   
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    const isLoggedIn = token && !this.isTokenExpired(token) ? true : false;
    console.log("Token:", token, "IsLoggedIn:", isLoggedIn);
    return isLoggedIn;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    
    localStorage.setItem('id_token', idToken);
    
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
