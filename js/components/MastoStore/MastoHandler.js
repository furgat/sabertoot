export default class MastoHandler {
  constructor(server, token) {
    this.token = token;
    this.server = server;
    this.request = require('superagent');

    console.log('S: ' + this.server + ', T: ' + this.token);
  }

  _post_request(endpoint, data) {
    const {token, server} = this;
    return this.request.post(server+endpoint)
                       .send(data)
                       .set('Authorization', 'Bearer ' + token)
                       .then(res=>res, err=>err);
  }

  _get_request(endpoint) {
    const {token, server} = this;
    return this.request.get(server+endpoint)
                       .set('Authorization', 'Bearer ' + token)
                       .then(res=>res, err=>err);
  }

  _encode_options(options = undefined) {
    if (options != undefined) {
      const params = [];
      for (var i = 0; i < options.length; i++) {
        params.push(options[i].key+options[i].val);
      }
      return (params.length ? params.join('&') : '');
    }
    return '';
  }

  // url option keys - max_id=, since_id=, limit=
  getTimeline(target = '', options) {
    if (target == '') return Promise.reject('no timeline selected');

    var url_target = 'timelines/';
    if (target.substring(0,1) == '#') {
      url_target += '/tag/' + target.substring(1);
    } else if (target != ''){
      url_target += target;
    }

    return this._get_request(url_target+this._encode_options(options));
  }
}
