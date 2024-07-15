import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8800/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const request = {
  get: (url, config = {}) =>
    instance.get(url, config),
  post: (url, data, config = {}) =>
    instance.post(url, data, config),
  put: (url, data, config = {}) =>
    instance.put(url, data, config),
  patch: (url, data, config = {}) =>
    instance.patch(url, data, config),
  delete: (url, config = {}) =>
    instance.delete(url, config),
};

export default request;
