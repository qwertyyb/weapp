const fetch = require('./request');
const { apiBaseUrl } = require('./constant');
const { unique } = require('./util');
const { updateRuntimeState } = require('../store/actions');
const store = require('../store/index');

const getToken = unique(() => {
  const { token } = store.getState().runtime;
  if (token) return token;
  return store.dispatch(require('../store/actions').getToken());
});

const getWhiteList = () => ([
  '/wechat/login',
]);

const loading = (config, next) => {
  wx.pro.showLoading({ title: '加载中' });
  return next().then((res) => {
    wx.pro.hideLoading();
    return res;
  }).catch((err) => {
    wx.pro.hideLoading();
    throw err;
  });
};

const formType = async (config, next) => {
  config.header = {
    ...(config.header || {}),
    'content-type': 'application/x-www-form-urlencoded',
  };
  config.url = apiBaseUrl + config.url;
  await next();
};

const withToken = (whiteList) => async (config, next) => {
  const inWhiteList = whiteList.some((url) => config.url.includes(url));
  if (inWhiteList) {
    return next();
  }
  config.header = {
    ...(config.header || {}),
    Authorization: await getToken(),
  };
  return next();
};

const filterResponse = async (ctx, next) => {
  await next();
  try {
    const { statusCode, data } = ctx.response || {};
    if (statusCode >= 400) {
      throw new Error(`请求出错: ${data || ''}${statusCode}`);
    }
    if (data.code === 2013) {
      // @todo 重新登录
      wx.pro.removeStorageSync('token');
      store.dispatch(updateRuntimeState({ token: '' }));
      throw new Error('请重新打开小程序');
    }
    // check response data
    if (data.code !== 2000) {
      throw new Error(data.msg);
    }
    return data;
  } catch (err) {
    wx.pro.showToast({
      icon: 'none',
      duration: 2000,
      title: err.message || err.Msg || 'error',
    });
    throw err;
  }
};

const log = async (config, next) => {
  console.log(`${config.method || 'GET'} -> ${config.url}`, config.data);
  await next();
  console.log(`${config.method || 'GET'} <- ${config.url}`, config.response);
};

fetch.use(loading);
fetch.use(formType);
fetch.use(withToken(getWhiteList()));
fetch.use(filterResponse);
fetch.use(log);

const get = (url) => (params) => fetch({ url, data: params, method: 'GET' });
const post = (url) => (data) => fetch({ url, data, method: 'POST' }).then((ctx) => ctx.response.data);

module.exports = {
  get, post,
};
