import HttpService from './http.service';

export default class ApiService {
  static debugMode = true;

  static apiUri = url => `/api/${url}`;

  static get = url =>
    HttpService.get(ApiService.apiUri(url))
      .then(response => response.json())
      .catch(ApiService.handleError)
      .then(ApiService.handleResponse);

  static remove = url =>
    HttpService.remove(ApiService.apiUri(url))
      .then(response => response.json())
      .catch(ApiService.handleError)
      .then(ApiService.handleResponse);

  static post = (url, body) =>
    HttpService.post(ApiService.apiUri(url), body)
      .then(response => response.json())
      .catch(ApiService.handleError)
      .then(ApiService.handleResponse);

  static patch = (url, body) =>
    HttpService.patch(ApiService.apiUri(url), body)
      .then(response => response.json())
      .catch(ApiService.handleError)
      .then(ApiService.handleResponse);

  static handleError = (error, url) => {
    if (ApiService.debugMode) {
      console.error('API error in URL', url, 'Error: ', error); // eslint-disable-line no-console
    }
    throw new Error(error);
  };

  static handleResponse = (data) => {
    if (ApiService.debugMode) {
      console.log('Data: ', data); // eslint-disable-line no-console
    }
    return data;
  };
}
