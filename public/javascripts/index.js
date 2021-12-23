const config = {
  "local": {
    "domain": "http://localhost:3000"
  },
  "production": {
    "domain": "https://zolo-backend.herokuapp.com"
  },
  "domain_aws": "https://storage-zolo.s3.ap-southeast-1.amazonaws.com/"
}
$(function() {
  $(".heading-compose").click(function() {
    $(".side-two").css({
      "left": "0"
    });
  });

  $(".newMessage-back").click(function() {
    $(".side-two").css({
      "left": "-100%"
    });
  });

  $("#btnDSBanCho").click(function() {
    $(".side-three").css({
      "left": "0"
    });
  });

  $(".newMessage-back1").click(function() {
    $(".side-three").css({
      "left": "-100%"
    });
  });

  $("#btnDSDen").click(function() {
    $(".side-four").css({
      "left": "0"
    });
  });

  $(".newMessage-back2").click(function() {
    $(".side-four").css({
      "left": "-100%"
    });
  });

  $("#btnFindUser").click(function() {
    $(".side-five").css({
      "left": "0"
    });
  });

  $(".newMessage-back3").click(function() {
    $(".side-five").css({
      "left": "-100%"
    });
  });
})