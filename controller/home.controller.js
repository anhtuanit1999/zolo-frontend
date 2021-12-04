const DOMAIN = require("../lib/fetchAPI");
const axios = require('axios').default;
const { getCookies } = require('../middlerware/authen/index');
module.exports = {
  getHome: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    // Gửi tới API
    let friends, groups, user, friendWait, friendBan;
    try {
      [friends, groups, user, friendWait, friendBan] = await Promise.all([
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
        }),
        axios({
          method: 'POST',
          url: `${DOMAIN}/friend/getinvite`,
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
          url: `${DOMAIN}/friend/getBan`,
          data: {
            limit: 10,
            lastId: 0
          },
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
      user: user.data.data,
      friendWaitLen: friendWait.data.data.length,
      friendWaits: friendWait.data.data,
      friendBanLen: friendBan.data.data.length,
      friendBans: friendBan.data.data
    });
  },
  getCreateGroup: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    // Gửi tới API
    let friend;
    try {
      friend = await axios({
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
      })
    } catch (e) {
      console.log(e.response);
      return res.redirect('/creategroup');
    }
    return res.render('creategroup', {
      title: 'Tạo nhóm chat',
      friends: friend.data.data,
      friendsLen: friend.data.data.length
    });
  }
}