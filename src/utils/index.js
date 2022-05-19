import md5 from 'md5';
import { Toast, Dialog } from 'vant';

import projectConfig from '../project.config';
import { get } from './globalData';

const { encodeKey } = projectConfig;
const appTokenName = 'lpy_token';
const appOidName = 'lpy_oid';
let hideLoadingTimer = null;
Toast.setDefaultOptions('loading', { forbidClick: true, duration: 0 });

export function showLoading(message = '加载中...') {
  clearTimeout(hideLoadingTimer);
  Toast.loading({ message });
}

export function hideLoading() {
  hideLoadingTimer = setTimeout(() => Toast.clear(), 100);
}

export function showToast(message) {
  Toast({ message, forbidClick: false });
}

export function showModal(message, cb) {
  Dialog.alert({ message }).then(() => {
    cb && cb();
  });
}

export function validateTelephone(tel) {
  return /^1[3456789]\d{9}$/.test(tel);
}

export function getToken() {
  try {
    return localStorage.getItem(appTokenName);
  } catch (e) {
    return null;
  }
}

export function setToken(token) {
  localStorage.setItem(appTokenName, token);
}

export function removeToken() {
  localStorage.removeItem(appTokenName);
}

export function getOid() {
  try {
    return localStorage.getItem(appOidName);
  } catch (e) {
    return null;
  }
}

export function setOid(oid) {
  localStorage.setItem(appOidName, oid);
}

export function removeOid() {
  localStorage.removeItem(appOidName);
}

export function isWeixinBrowser() {
  const ua = window.navigator.userAgent.toLowerCase();
  return /micromessenger/.test(ua);
}

export function getRandomStr(num) {
  const dict = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < num; i++) {
    const random = Math.floor(Math.random() * dict.length);
    result += dict[random];
  }
  return result;
}

export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function encodeRequestData(data) {
  const copyData = {
    ...data,
    randomStr: getRandomStr(32),
    timeStamp: (new Date().getTime() / 1000).toFixed(0),
  };
  const sortKeys = Object.keys(copyData).sort();
  sortKeys.forEach((key, index) => (sortKeys[index] = `${key}=${copyData[key]}`));
  let dataStr = sortKeys.join('&');
  dataStr += `&key=${encodeKey}`;
  copyData.sign = md5(dataStr).toUpperCase();
  return copyData;
}

export function createVipLink(vipId) {
  return `${projectConfig.htmlURL}?vipId=${vipId}&channel_id=${get('channel_id')}`;
}

export function loadImage(imagePath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.crossOrigin = '';
    img.onload = () => resolve(img);
    img.onerror = () => reject(null);
    img.src = imagePath;
  });
}

export function sleep(t = 200) {
  return new Promise(rs => setTimeout(rs, t));
}
