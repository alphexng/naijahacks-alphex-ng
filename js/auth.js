const Al = AlphexElection;

$("#voterLogin").submit((e) => {
    e.preventDefault();
    $("#loader").removeClass("hide")

    const form = {
        username: $("#username").val(),
        password: $("#password").val()
    }
    Al.userLogin(form);
})

$("#adminLogin").submit((e) => {
    e.preventDefault();
    $("#loader").removeClass("hide")

    const form = {
        username: $("#username").val(),
        password: $("#password").val()
    }
    Al.adminLogin(form);
})

const checkLogin = (session) => {
    if (localStorage.getItem(session)!=null) {
        window.location.replace('index.html');
    }
}