module.exports = (tabBarItemIndex) => Behavior({
  created() {
    if (typeof this.getTabBar === 'function'
        && this.getTabBar()) {
      this.getTabBar().setData({
        selected: tabBarItemIndex,
      });
    }
  },
});
