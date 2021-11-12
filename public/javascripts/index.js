const config = {
  "local": {
    "domain": "http://localhost:3000"
  },
  "production": {
    "domain": "https://zolo-backend.herokuapp.com"
  }
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
})