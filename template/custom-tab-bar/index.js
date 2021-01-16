const developing = require('../behaviors/developing');

Component({
  behaviors: [developing],
  data: {
    selected: 0,
    color: '#666666',
    selectedColor: '#2F4290',
    list: [{
      pagePath: '/pages/home/home',
      iconPath: '/images/tabbar/home.png',
      selectedIconPath: '/images/tabbar/home-on.png',
      text: '首页',
    }, {
      pagePath: '/pages/act/act',
      iconPath: '/images/tabbar/act.png',
      selectedIconPath: '/images/tabbar/act-on.png',
      developing: true,
      text: '活动',
    }, {
      pagePath: '/pages/account/account',
      iconPath: '/images/tabbar/account.png',
      selectedIconPath: '/images/tabbar/account-on.png',
      text: '我的',
    }],
  },
  methods: {
    switchTab(e) {
      const { page } = e.currentTarget.dataset;
      if (page.developing) {
        return this.showDevelopingTip();
      }
      wx.pro.switchTab({
        url: e.currentTarget.dataset.path,
      });
    },
  },
});
