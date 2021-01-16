module.exports = Behavior({
  methods: {
    showDevelopingTip() {
      wx.showModal({
        title: '温馨提示',
        content: '本功能即将开放，敬请期待',
        showCancel: false,
        confirmText: '确定',
      });
    },
  },
});
