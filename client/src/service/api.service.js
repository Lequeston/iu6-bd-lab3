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

  async post(url, body, headers) {
    return await fetch(`${this.apiUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        ...headers,
        Authorization: this.authorizationToken,
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}

export default new ApiService(process.env.REACT_APP_API_URL);