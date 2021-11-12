const DOMAIN = require("../lib/fetchAPI");
const axios = require('axios').default;
const { getCookies } = require('../middlerware/authen/index');
module.exports = {
  getHome: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    // Gửi tới API
    let friends, groups, user;
    try {
      [friends, groups, user] = await Promise.all([
        axios({
          method: 'POST',
          url: `${DOMAIN}/friend/getall`,
          data: {
            limit: 10,
            lastId: 0
          },
          responseType: 'json',
          headers: {
            Authorization: 'Bearer ' + token
          }
        }),
        axios({
          method: 'POST',
          url: `${DOMAIN}/group/get`,
          data: {
            limit: 10,
            lastId: 0
          },
          responseType: 'json',
          headers: {
            Authorization: 'Bearer ' + token
          }
        }),
        axios({
          method: 'GET',
          url: `${DOMAIN}/user/detail`,
          responseType: 'json',
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
      ]);
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data !== 404) return res.redirect('/auth/signin');
    }
    // console.log(friends.data.data);
    return res.render('index', {
      title: 'Chat app',
      friends: friends.data.data,
      friendsLen: friends.data.data.length,
      groups: groups.data.data,
      groupsLen: groups.data.data.length,
      user: user.data.data
    });
  }
}