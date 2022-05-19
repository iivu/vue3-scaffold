import axios from 'axios';

import { showModal, showLoading, hideLoading, getToken, encodeRequestData } from './index';
import projectConfig from '../project.config';

const httpClient = axios.create({
  baseURL: projectConfig.apiURL,
  timeout: 20000,
  withCredentials: true,
});

function httpStatusInterceptor(res) {
  const { data, config } = res;
  hideLoading();
  if (data.code === 20000) {
    window.location.reload(true);
    return false;
  }
  if (data.code !== 0) {
    config.isCatch && showModal(data.msg);
    return false;
  }
  return data;
}

const errorHandler = () => {
  hideLoading();
  showModal('网络繁忙');
  return Promise.reject(false);
};

httpClient.interceptors.response.use(httpStatusInterceptor);

class Http {
  static get(url, params = {}, loading = true, isCatch = true) {
    if (loading) showLoading();
    return httpClient
      .get(url, {
        headers: { token: getToken() },
        params: encodeRequestData({ ...params, activityId: 1 }),
        loading,
        isCatch,
      })
      .catch(errorHandler);
  }

  static post(url, data = {}, loading = true, isCatch = true) {
    if (loading) showLoading();
    return httpClient
      .post(url, encodeRequestData({ ...data, activityId: 1 }), {
        headers: { token: getToken() },
        loading,
        isCatch,
      })
      .catch(errorHandler);
  }
}

export default Http;
