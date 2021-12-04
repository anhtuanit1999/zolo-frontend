const DOMAIN = require("../lib/fetchAPI");
const axios = require('axios').default;
const { getCookies } = require('../middlerware/authen/index');
module.exports = {
  getAll: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    const { lastId } = req.body;
    // Gửi tới API
    let groups;
    try {
      groups = await axios({
        method: 'POST',
        url: `${DOMAIN}/group/get`,
        data: {
          limit: 10,
          lastId: +lastId
        },
        responseType: 'json',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data !== 404) return res.redirect('/');
    }
    return res.send({
      length: groups.data.data.length,
      groups: groups.data.data
    });
  },
  getOrCreateSingleGroup: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    const { idFriend } = req.body;
    // Gửi tới API
    let group;
    try {
      group = await axios({
        method: 'POST',
        url: `${DOMAIN}/group/getorcreatesingle`,
        data: {
          idFriend: +idFriend
        },
        responseType: 'json',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    } catch (e) {
      console.log(e.response);
      if (e.response !== 404) return res.redirect('/');
    }
    console.log(group);
    return res.send({
      groupId: group.data.data.id
    });
  },
  creategroup: async(req, res) => {
    // Lấy jwt
    const token = getCookies(req)['jwt'];
    const { name, listFriendSelected } = req.body;
    let data;
    try {
      data = await axios({
        method: 'POST',
        url: `${DOMAIN}/group/create`,
        data: {
          name,
          idFriends: listFriendSelected
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
    return res.redirect('/')
  }
}