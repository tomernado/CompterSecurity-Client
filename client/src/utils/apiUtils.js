import axios from 'axios';

const getCurrentPort = () => {
  const saved = localStorage.getItem('safeMode');
  const safeMode = saved !== null ? JSON.parse(saved) : true;
  return safeMode ? '3000' : '5000';
};

const updateUrlPort = (url) => {
  const urlObj = new URL(url);
  const currentPort = getCurrentPort();
  urlObj.port = currentPort;
  return urlObj.toString();
};

const shouldExcludeUserName = (url) => {
  const excludedPaths = ['/register', '/forgot-password'];
  return excludedPaths.some(path => url.includes(path));
};

export const apiGet = (url, userName, config = {}) => {
  const updatedUrl = updateUrlPort(url);
  const urlObj = new URL(updatedUrl);
  const port = urlObj.port;
  const paramName = url.includes('/getUserName') ? 'username' : 'userName';
  
  if (port === '5000' && userName && !shouldExcludeUserName(url)) {
    urlObj.searchParams.append(paramName, userName);
  }
  
  const withCredentials = port !== '5000';
  return axios.get(urlObj.toString(), { ...config, withCredentials });
};

export const apiPost = (url, data, userName, config = {}) => {
  let requestData = { ...data };
  const updatedUrl = updateUrlPort(url);
  const urlObj = new URL(updatedUrl);
  const port = urlObj.port;
  
  if (port === '5000' && userName && !shouldExcludeUserName(url)) {
    requestData = { ...requestData, userName };
  }
  
  const withCredentials = port !== '5000';
  return axios.post(updatedUrl, requestData, { ...config, withCredentials });
};

export const getApiUrl = (path) => {
  const port = getCurrentPort();
  return `http://localhost:${port}${path}`;
};
