import fetch from 'dva/fetch';
import { notification } from 'antd';

const host = 'http://127.0.0.1:2003';

export default function request(URL, params,sCallback) {
  let paramsStr = "";
  for (const field in params) {
    let val = params[field]
    if(val){
      paramsStr += field + '=' + val + '&';

    }
  }
  console.log(paramsStr);

  let url = host + URL + '?' + paramsStr;
  let option = {
    // body: JSON.stringify(params), // must match 'Content-Type' header
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      // token :"b567bc440d8745fea30ac97f444a8ddd",
      token: window.localStorage.token,
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, cors, *same-origin
    // redirect: 'follow', // manual, *follow, error
    // referrer: 'no-referrer', // *client, no-referrer
  };

  let resp = fetch(url, option)
    .then(response => {
      return response.json();
    }).then(
      response => {
        console.log('reponse:', response);
        if (url.indexOf('/api/v1') != -1 && response.code !== '1') {
          notification.error({
            message: `请求错误 `,
            // message: `请求错误 ${response.status}: ${response.url}`,
            description: response.msg,
          });
        }
        if (url.indexOf('/api/v1') != -1 && response.code == '1000') {
          window.g_app._store.dispatch({
            type: 'login/logout',
          });
        }
        console.log("callback:",sCallback)
        if(sCallback)sCallback();
        return response.data;
      },
    )
    .catch(e => {
    });

  return resp;
}
