export default class HttpService {
  static headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  static get = url =>
    fetch(url, {
      method: 'GET',
      headers: HttpService.headers
    }).then(HttpService.httpStatusHelper);

  static remove = (url, body) =>
    fetch(url, {
      method: 'DELETE',
      headers: HttpService.headers,
      body: JSON.stringify(body)
    }).then(HttpService.httpStatusHelper);

  static post = (url, body) =>
    fetch(url, {
      method: 'POST',
      headers: HttpService.headers,
      body: JSON.stringify(body)
    }).then(HttpService.httpStatusHelper);

  static patch = (url, body) =>
    fetch(url, {
      method: 'PATCH',
      headers: HttpService.headers,
      body: JSON.stringify(body)
    }).then(HttpService.httpStatusHelper);

  static httpStatusHelper = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText));
  };
}
