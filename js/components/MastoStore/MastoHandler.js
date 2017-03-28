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

  _timeline_options(options = undefined) {
    if(options != undefined) {
      const params = []
			if(options.max_id) params.push('max_id='+options.max_id)
			if(options.since_id) params.push('since_id='+options.since_id)
			if(options.limit) params.push('limit='+options.limit)
			if(params.length) return '?'+params.join('&')
    }
    return '';
  }

  getTimeline(target = '', options) {
    if (target == '') return Promise.reject('no timeline selected');

    var url_target = 'timelines/';
    if (target.substring(0,1) == '#') {
      url_target += '/tag/' + target.substring(1);
    } else if (target != ''){
      url_target += target;
    }

    return this._get_request(url_target+this._timeline_options(options));
  }
}
