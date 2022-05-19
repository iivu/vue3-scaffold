// 这里的是静态数据，是app刚打开时的初始状态，可以用来初始化store和构建微信授权链接
const globalData = {};

export function set(key, value) {
  globalData[key] = value;
  return value;
}

export function get(key) {
  return globalData[key];
}
