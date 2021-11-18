const DOMAIN = require("../lib/fetchAPI");
const axios = require('axios').default;
const { getCookies } = require('../middlerware/authen/index');
module.exports = {
  saveMessage: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    const { chatgroupId, userId, content } = req.body;
    // Gửi tới API
    let messages;
    try {
      messages = await axios({
        method: 'POST',
        url: `${DOMAIN}/message/create`,
        data: {
          chatgroupId: +chatgroupId,
          userId: +userId,
          content
        },
        responseType: 'json',
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data !== 404) return res.redirect('/auth/signin');
    }
    return res.send('done');
  },
  getAllMessages: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    const { chatgroupId, limit, lastId } = req.body;
    // Gửi tới API
    let messages;
    try {
      messages = await axios({
        method: 'POST',
        url: `${DOMAIN}/message/getall`,
        data: {
          chatgroupId: +chatgroupId,
          limit: +limit,
          lastId: +lastId
        },
        responseType: 'json',
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      console.log(messages.data);
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data !== 404) return res.redirect('/auth/signin');
    }
    // console.log(messages.data.data);
    return res.send(messages.data.data);
  }
}