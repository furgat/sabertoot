export default function MastoHandler(server, token) {
  const _LOG = false;
  if (_LOG) console.log('S: ' + this.server + ', T: ' + this.token);

  return {
    token,
    server,
    request: require('superagent'),

    _post_request(endpoint, token, data) {
      if (_LOG) {
        console.log('POST: ' + endpoint); console.log('AUTH: ' + token); console.log('SEND: ' + data);
      }
      return this.request.post(endpoint)
                         .send(data)
                         .set('Authorization', 'Bearer ' + token)
                         .then(res=>res, err=>err);
    },

    _get_request(endpoint, token) {
      if (_LOG) {
        console.log('GET : ' + endpoint); console.log('AUTH: ' + token);
      }
      return this.request.get(endpoint)
                         .set('Authorization', 'Bearer ' + token)
                         .then(res=>res, err=>err);
    },

    _encode_options(options = {}) {
      const params = [];
      for (var i = 0; i < options.length; i++) {
        params.push(options[i].key+options[i].val);
      }
      return (params.length > 0 ? params.join('&') : '');
    },

    // url option keys - max_id=, since_id=, limit=
    getTimeline(target = '', options) {
      if (target == '') return Promise.reject('no timeline selected');

      var url_target = this.server;
      if (target.substring(0,1) == '#') {
        url_target += 'timelines/tag/' + target.substring(1);
      } else {
        url_target += target;
      }

      return this._get_request(url_target+this._encode_options(options), this.token);
    }
  };
}
