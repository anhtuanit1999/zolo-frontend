exports.anthentication = (req, res, next) => {
  const jwt = getCookies(req)['jwt'];
  console.log(jwt);
  if (!jwt) {
    return res.redirect('/auth/signin');
  } else next();
}

const getCookies = function(request) {
  let cookies = {};
  if (request.headers && request.headers.cookie) {
    request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
      const parts = cookie.match(/(.*?)=(.*)$/)
      cookies[parts[1].trim()] = (parts[2] || '').trim();
    });
  } else cookies = null;
  return cookies;
};