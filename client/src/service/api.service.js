class ApiService {
  apiUrl = '';
  authorizationToken = 1;

  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  setAuthorizationToken(authorizationToken) {
    this.authorizationToken = authorizationToken;
  }

  async get(url, headers) {
    return await fetch(`${this.apiUrl}${url}`, {
      method: 'GET',
      headers: {
        ...headers,
        Authorization: this.authorizationToken
      }
    })
  }
}

export default new ApiService(process.env.REACT_APP_API_URL);