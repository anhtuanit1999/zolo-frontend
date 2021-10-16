const DOMAIN = require("../lib/fetchAPI");
const axios = require('axios').default;
module.exports = {
  signUp: async(req, res) => {
    const { phone, nickname, email, idRole, fullName, password, birthday } = req.body;
    // Gửi tới API
    const result = await axios({
      method: 'POST',
      url: `${DOMAIN}/auth/signup`,
      data: {
        phone,
        nickname,
        email,
        idRole,
        fullName,
        password,
        birthday,
        idRole: 1
      },
      responseType: 'json'
    });
    if (result.data.code == 200) return res.redirect('/auth/verify?email=' + email);
    return res.redirect('/auth/signup');
  },
  signIn: async(req, res) => {
    const { email, password } = req.body;
    // Gửi tới API
    const result = await axios({
      method: 'POST',
      url: `${DOMAIN}/auth/signin`,
      data: {
        email,
        password
      },
      responseType: 'json'
    });
    if (result.data.code == 200) {
      // window.localStorage.setItem('accessToken', 'Bearer ' + result.data.jwt);
      const data = {
        code: result.data.code,
        jwt: result.data.data.jwt
      }
      return res.send(data);
    }
    if (result.data.code == 400 && result.data.message == 'Người dùng chưa kích hoạt tài khoản')
      return res.redirect('/auth/verify?email=' + email);
    return res.redirect('/auth/signin');
  },
  verifyOTP: async(req, res) => {
    const { email, otp } = req.body;
    // Gửi tới API
    const result = await axios({
      method: 'POST',
      url: `${DOMAIN}/auth/verify`,
      data: {
        email,
        otp
      },
      responseType: 'json'
    });
    if (result.data.code == 200) return res.redirect('/auth/signin?email=' + email);
    return res.redirect('/auth/verify?email=' + email);
  },
  reSendOTP: async(req, res) => {
    const { email } = req.body;
    const result = await axios({
      method: 'POST',
      url: `${DOMAIN}/auth/resendotp`,
      data: {
        email
      },
      responseType: 'json'
    });
    return res.send({...result.data });
  }
}