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

$('#view-btn').click(() => {
  let tab = $(this).parent('.tab');
  tab.css("height", "300px");
});

$('#add-election').click(() => {
  $('#ongoing-election-section').css("display","none");
  $('#add-election-section').css("display","block");
});

$('#add-candidate').click(() => {
  $('#candidates-section').css("display",'none');
  $('#add-candidate-section').css("display","block");
});