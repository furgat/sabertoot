export class MastoHandler {
  constructor(server, token) {
    this.token = token;
    this.server = server;
  }

  _post_request(endpoint, data) {
    var postPromise = new Promise((resolve, reject) => {
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
    var getPromise = new Promise((resolve, reject) => {
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

  _timeline_options(options) {
    if(typeof(options) == 'object') {
      const params = []
			if(options.max_id) params.push('max_id='+options.max_id)
			if(options.since_id) params.push('since_id='+options.since_id)
			if(options.limit) params.push('limit='+options.limit)
			if(params.length) return '?'+params.join('&')
    }
    return '';
  }

  getTimeline(timeline, options) {
    if (timeline == '') return Promise.reject('no timeline selected');


  }
}
