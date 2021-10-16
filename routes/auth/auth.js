var express = require('express');
const authController = require('../../controller/auth.controller');
var router = express.Router();

// Sign up 
router.get('/signup', function(req, res, next) {
  return res.render('auth/signup', { title: 'Đăng ký' });
});

router.post('/signup', function(req, res, next) {
  authController.signUp(req, res);
});

// Sign in
router.get('/signin', function(req, res, next) {
  return res.render('auth/signin', { title: 'Đăng nhập' });
});

router.post('/signin', function(req, res, next) {
  authController.signIn(req, res);
});

// Verify
router.get('/verify', function(req, res, next) {
  return res.render('auth/verify', { title: 'Xác thực OTP' });
});

router.post('/verify', function(req, res, next) {
  authController.verifyOTP(req, res);
});

// ReSendOTP
router.post('/resendotp', function(req, res, next) {
  authController.reSendOTP(req, res);
});

// Forgot password
router.get('/forgotpassword', function(req, res, next) {
  return res.render('auth/forgotpass', { title: 'Quên mật khẩu' });
});

router.post('/forgotpassword', function(req, res, next) {
  authController.forgotPassword(req, res);
});

// New password
router.get('/newpassword', function(req, res, next) {
  return res.render('auth/newpass', { title: 'Tạo mật khẩu mới' });
});

router.post('/newpassword', function(req, res, next) {
  authController.newPassword(req, res);
});

module.exports = router;