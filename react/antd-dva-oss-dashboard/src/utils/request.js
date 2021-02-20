import fetch from 'dva/fetch';
import {origin} from './config'
import auth from '../services/auth'
import {message} from 'antd'

function jsonParse(res) {
  return res.json().then(json => ({...res, json}));
}

function errorMessageParse(res) {
  const {code, msg} = res.json;
  if (code == 0) {
    return res.json;
  } else if (code == 10000) {
    auth.logout();
  } else {
    message.error(msg);
  }
}


function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {

  const opts = {...options};
  const myUrl = origin + url;
  opts.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    accessToken: auth.getToken(),
    ...opts.headers
  };
  opts.mode = 'cors';

  return fetch(myUrl, opts)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({data}))
    .catch((err) => ({err}));
}

export let fetchPost = (url, body, header) => {
  console.log('accessToken', auth.getToken());
  return fetch(`${origin}${url}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      accessToken: auth.getToken(),
      ...header
    },
    timeout: 3,
    mode: 'cors',
    body: JSON.stringify({
      ...body
    })
  }).then(checkStatus)
    .then(parseJSON)
}


export let parsePrice = (s) => {
  var n = 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse();
  var r = s.split(".")[1];
  var t = "";
  for (var i = 0; i < l.length; i++) {
    t += l[i];
  }
  return  t.split("").reverse().join("") + "." + r;
};


// lianpf 17/08/03
export let fetchGetNoToken = (url, header) => {
  return fetch(`${origin}${url}`, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...header
    },
    timeout: 3,
    mode: 'cors',
  }).then(checkStatus)
    .then(parseJSON)
}

export let fetchGet = (url, header) => {
  return fetch(`${origin}${url}`, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      accessToken: auth.getToken(),
      ...header
    },
    timeout: 3,
    mode: 'cors',
  }).then(checkStatus)
    .then(parseJSON)
}


