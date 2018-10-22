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
})

$("#nav-toggle-header").click(() => {
  $(".dropdown-nav").toggleClass("dropdown-nav-true");
})

$("#credList li").click(function() {
  const user = $(this).attr("user");
  const pass = $(this).attr("pass");

  $("#username").val(user);
  $("#password").val(pass);
  $("#credentials").click();
})

const modal = (el,attr,event) => {
  const element = document.getElementsByClassName(el);
  for (let i = 0; i < element.length; i++) {
      const classElement = element[i];
      classElement.addEventListener(event,()=>{
          const target = classElement.getAttribute(attr);
          const element2 = document.getElementById(target);
          element2.classList.add("modal-show");
      })
  }
}

const closeModal = (el,event) => {
  const element = document.getElementById(el);
  document.addEventListener(event,(e)=>{
      if (!e.target.matches('#'+el)) return;
      element.classList.remove("modal-show");
  })
}

modal("credB","modal","click")
closeModal("credentials","click")

$(".logout").click(() => {
  localStorage.removeItem('electionVoter');
  window.location.href = 'login.html';
})
