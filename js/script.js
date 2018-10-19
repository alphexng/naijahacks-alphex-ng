let isNavVisible = true;

const hideNav = () => {
  $('#side-nav').css("width",'10%');
  $('.side').css("margin-left",'10%');
  $('.link').css("display","none");
  $('.card').css('width','27%');
  $('.icon').css("padding",'20px');
  isNavVisible = false;
}

const showNav = () => {
  $('#side-nav').css("width", '18%');
  $('.side').css("margin-left", '18%');
  $('.link').css("display", "block");
  $('.card').css('width', '25%');
  $('.icon').css("padding", '5px');
  isNavVisible = true;
}

$('#nav-toggle').click(() => {
  if(isNavVisible){
    hideNav();
  }else {
    showNav();
  }
})