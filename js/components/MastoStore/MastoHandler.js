// small object to handle individual
export class MastoHandler {
  constructor(server, token) {
    this.token = token;
    this.server = server;
  }

  _post_request(endpoint, data) {
    let postPromise = new Promise((resolve, reject) => {
      const {token, server} = this;
      const headers = new Headers();
      headers.set('Authorization', 'Bearer ' + token);
      const body = new URLSearchParams();
      for(var key in data) body.set(key, data[key]);
      const init = {
        method : 'POST',
        mode : 'cors',
        headers,
        body
      };
      return fetch(server+endpoint, init).then(response=>response);
    });

    return postPromise.then(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  _get_request(endpoint) {
    let getPromise = new Promise((resolve, reject) => {
      const {token, server} = this;
      const headers = new Headers();
      headers.set('Authorization', 'Bearer ' + token);
      const init = {
        method : 'GET',
        mode : 'cors',
        headers
      };
      return fetch(server+endpoint, init).then(response=>response);
    });

    return postPromise.then(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
}
