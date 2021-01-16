const updateUserInfoState = (state) => ({
  type: 'updateUserInfoState',
  payload: state,
});

const saveUserInfo = (wxuserinfo, rawInfo = {}) => (dispatch) => {
  const {
    nickName, gender, avatarUrl, province, city, country,
  } = wxuserinfo;
  const formattedInfo = {
    country,
    province,
    city,
    gender,
    avatar_url: avatarUrl,
    nick_name: nickName,
  };
  const { encryptedData, iv } = rawInfo;
  return require('../service/index').saveUserInfo({
    encrypted_data: encryptedData,
    iv,
  }).then(() => {
    dispatch(updateUserInfoState({ wxuserinfo: formattedInfo }));
  });
};

const getRealInfo = () => (dispatch) => {
  require('../service/index').getRealInfo().then(({ data }) => {
    const { real_name, phone } = data;
    return dispatch(updateUserInfoState({
      realInfo: { real_name, phone },
    }));
  });
};

const updateRuntimeState = (state) => ({
  type: 'updateRuntimeState',
  payload: state,
});

// 检查微信的登录态有无过期，后端解密加密信息，需要保证sessionKey有效
const getToken = () => (dispatch) => wx.pro.checkSession()
  .then(async () => {
    // session有效，获取本地token
    const { data: token } = await wx.pro.getStorage({ key: 'token' });
    if (!token) throw new Error('no local token');
    return token;
  })
  .catch((err) => {
    console.log(err);
    // session或本地token不可用时，需要调用wx.login，通过code获得token, 后端应保存sessionKey, 返回业务token
    return wx.pro.login()
      .then(({ code }) => require('../service/index').login({ code }))
      .then(({ data }) => data.token);
  })
  .then((token) => {
    dispatch(updateRuntimeState({ token }));
    return token;
  });

module.exports = {
  updateUserInfoState,
  saveUserInfo,

  getRealInfo,

  updateRuntimeState,
  getToken,
};
