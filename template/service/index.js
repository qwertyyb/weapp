const { post } = require('../utils/fetch');

module.exports = {
  login: post('/wechat/login'),
  saveUserInfo: post('/wechat/save_encrypted_data'),
  savePhone: post('/wechat/save_phone'),
  getRealInfo: post('/wechat/userinfo'),
  setRealName: post('/wechat/set_real_name'),
  sendSmsCode: post('/wechat/send_sms'),
  setPhone: post('/wechat/set_phone'),
  setAddress: post('/wechat/set_address'),
  getAddress: post('/wechat/get_address'),

  getPatientList: post('/wechat/get_diagnose'),
  setPatient: post('/wechat/set_diagnose'),

  getInterestList: post('/wechat/get_interest_tag'),
  setInterest: post('/wechat/set_interest_tag'),

  getHome: post('/wechat/home'),

  getProvinceList: post('/wechat/get_province_list'),
  getCityList: post('/wechat/get_city_list'),
  getAreaList: post('//wechat/get_area_list'),

  getArticleList: post('/wechat/article_list'),
  getArticleInfo: post('/wechat/article_detail'),
};
