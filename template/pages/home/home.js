const connect = require('../../utils/connect');
const setTabBar = require('../../behaviors/setTabBar');
const developing = require('../../behaviors/developing');
const { getHome } = require('../../service/index');

const getDefaultHome = () => ({
  column_list: [
    {
      image: '../../../images/item1.png',
      label: '分类1',
    },
    {
      image: '../../../images/item2.png',
      label: '分类2',
    },
    {
      image: '../../../images/item3.png',
      label: '分类3',
    },
    {
      image: '../../../images/item4.png',
      label: '分类4',
    },
  ],
  live_list: [
    {
      id: 1,
      image: 'https://via.placeholder.com/683x341',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/683x341',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/683x341',
    },
  ],
  activity_list: [
    {
      id: 1,
      image: 'https://via.placeholder.com/334x343',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/334x343',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/334x343',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/334x343',
    },
  ],
});

connect.Component(
  (state) => ({
    userInfo: state.userinfo.wxuserinfo,
  }),
)({
  behaviors: [
    setTabBar(0),
    developing,
  ],
  data: {
    home: getDefaultHome(),
  },
  methods: {
    refresh() {
      return getHome().then(({ data }) => {
        this.setData({
          home: data,
        });
      });
    },
    onLoad() {
      this.refresh();
    },
    onPullDownRefresh() {
      return this.refresh();
    },
  },
});
