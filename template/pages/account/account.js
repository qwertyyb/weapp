const connect = require('../../utils/connect');
const setTabBar = require('../../behaviors/setTabBar');
const developing = require('../../behaviors/developing');
const { getRealInfo } = require('../../store/actions');

connect.Component((state) => {
  const { realInfo } = state.userinfo;
  return {
    realInfo,
  };
})({

  behaviors: [
    setTabBar(4),
    developing,
  ],
  data: {
  },
  methods: {

  },
  created() {
    const app = getApp();
    app.store.dispatch(getRealInfo());
  },
  attached() {

  },
  ready() {

  },
  moved() {

  },
  detached() {

  },
});
