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
    })
    if (result.data.code == 200) return res.redirect('/auth/verify?email=' + email);
    return res.redirect('/auth/signup');
  },
  signIn: async(req, res) => {
    const { email, password } = req.body;
    // Gửi tới API
    try {
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
        res.cookie('jwt', result.data.data.jwt);
        return res.redirect('/')
      }
      if (result.data.code == 400 && result.data.message == 'Người dùng chưa kích hoạt tài khoản')
        return res.redirect('/auth/verify?email=' + email);
    } catch (error) {
      console.log(error);
    }

    return res.redirect('/auth/signin?email=' + email);
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
    }).catch(err => console.log(err));;
    if (result.data.code == 200) return res.redirect('/auth/signin?email=' + email);
    return res.redirect('/auth/verify?email=' + email);
  },
  reSendOTP: async(req, res) => {
    const { email } = req.body;
    // Gửi tới API
    const result = await axios({
      method: 'POST',
      url: `${DOMAIN}/auth/resendotp`,
      data: {
        email
      },
      responseType: 'json'
    }).catch(err => console.log(err));;
    return res.send({...result.data });
  },
  forgotPassword: async(req, res) => {
    const { email } = req.body;
    // Gửi tới API
    const result = await axios({
      method: 'POST',
      url: `${DOMAIN}/auth/forgotpassword`,
      data: {
        email
      },
      responseType: 'json'
    }).catch(err => console.log(err));;
    if (result.data.code == 200) return res.redirect('/auth/newpassword?email=' + email);
    return res.redirect('/auth/forgotpassword?email=' + email);
  },
  newPassword: async(req, res) => {
    const { email, password, otp } = req.body;
    // Gửi tới API
    const result = await axios({
      method: 'POST',
      url: `${DOMAIN}/auth/newpassword`,
      data: {
        email,
        password,
        otp
      },
      responseType: 'json'
    }).catch(err => console.log(err));;
    if (result.data.code == 200) return res.redirect('/auth/signin?email=' + email);
    return res.redirect('/auth/newpassword?email=' + email);
  }
}