const DOMAIN = require("../lib/fetchAPI");
const axios = require('axios').default;
const { getCookies } = require('../middlerware/authen/index');
module.exports = {
  unBan: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    const { idFriend } = req.body;
    // Gửi tới API
    let message;
    try {
      message = await axios({
        method: 'POST',
        url: `${DOMAIN}/friend/unban`,
        data: {
          idFriend: +idFriend
        },
        responseType: 'json',
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data !== 404) return res.redirect('/');
    }
    return res.send({
      message: message.data.message
    });
  },
  accept: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    const { idFriend } = req.body;
    // Gửi tới API
    let message;
    try {
      message = await axios({
        method: 'POST',
        url: `${DOMAIN}/friend/add`,
        data: {
          idFriend: +idFriend
        },
        responseType: 'json',
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data !== 404) return res.redirect('/');
    }
    return res.send({
      message: message.data.message
    });
  },
  deny: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    const { idFriend } = req.body;
    // Gửi tới API
    let message;
    try {
      message = await axios({
        method: 'POST',
        url: `${DOMAIN}/friend/deny`,
        data: {
          idFriend: +idFriend
        },
        responseType: 'json',
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data !== 404) return res.redirect('/');
    }
    return res.send({
      message: message.data.message
    });
  },
  ban: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    const { idFriend } = req.body;
    // Gửi tới API
    let message;
    try {
      message = await axios({
        method: 'POST',
        url: `${DOMAIN}/friend/ban`,
        data: {
          idFriend: +idFriend
        },
        responseType: 'json',
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data !== 404) return res.redirect('/');
    }
    return res.send({
      message: message.data.message
    });
  },
  findUser: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    const { keyWord } = req.body;
    // Gửi tới API
    let users;
    try {
      users = await axios({
        method: 'POST',
        url: `${DOMAIN}/friend/finduser`,
        data: {
          keyWord
        },
        responseType: 'json',
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data !== 404) return res.redirect('/');
    }
    return res.send({
      userLen: users.data.data.length,
      users: users.data.data
    });
  },
  invite: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    const { idFriend } = req.body;
    // Gửi tới API
    let message;
    try {
      message = await axios({
        method: 'POST',
        url: `${DOMAIN}/friend/make`,
        data: {
          idFriend: +idFriend
        },
        responseType: 'json',
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data !== 404) return res.redirect('/');
    }
    return res.send({
      message: message.data.message
    });
  },
  unFriend: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    const { idFriend } = req.body;
    // Gửi tới API
    try {
      await axios({
        method: 'POST',
        url: `${DOMAIN}/friend/ban`,
        data: {
          idFriend: +idFriend
        },
        responseType: 'json',
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      await axios({
        method: 'POST',
        url: `${DOMAIN}/friend/unban`,
        data: {
          idFriend: +idFriend
        },
        responseType: 'json',
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data !== 404) return res.redirect('/');
    }
    return res.send({
      message: 'Hủy kết bạn thành công'
    });
  }
}