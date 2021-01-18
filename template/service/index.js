const { post } = require('../utils/fetch');

module.exports = {
  login: post('/wechat/login'),
  saveUserInfo: post('/wechat/save_encrypted_data'),
  savePhone: post('/wechat/save_phone'),
  getRealInfo: post('/wechat/userinfo'),
};
