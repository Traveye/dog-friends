import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    console.log('hitting getProfile client auth')
   
    return decode(this.getToken());
  }

  loggedIn() {
    console.log('hitting loggin client auth')
    const token = this.getToken();
    console.log(token)
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    console.log('hitting isTokenExpired client auth')
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    console.log('hitting getToken client auth')
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    
    localStorage.setItem('id_token', idToken);
    
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
