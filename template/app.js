// app.js
const { promisifyAll } = require('miniprogram-api-promise');
const EventEmitter = require('eventemitter3');
const store = require('./store/index');
const { saveUserInfo } = require('./store/actions');

const pro = {};
// promisify all wx's api
promisifyAll(wx, pro);
wx.pro = pro;
wx.eventBus = new EventEmitter();

App({
  onLaunch() {
    wx.pro.getSetting().then(({ authSetting }) => {
      if (!authSetting['scope.userInfo']) {
        // 未授权获取用户信息，跳去授权页面
        wx.pro.redirectTo({ url: '/pages/auth/auth' });
      }
      return wx.pro.getUserInfo({
        withCredentials: true,
      })
        .then((res) => store.dispatch(saveUserInfo(res.userInfo, res)));
    });
  },
  store,
  globalData: {
  },
});
