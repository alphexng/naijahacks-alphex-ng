const All = AlphexElection;

$("#voterLogin").submit((e) => {
    e.preventDefault();
    $("#loader").removeClass("hide")

    const form = {
        username: $("#username").val(),
        password: $("#password").val()
    }
    All.userLogin(form);
})

$("#adminLogin").submit((e) => {
    e.preventDefault();
    $("#loader").removeClass("hide")

    const form = {
        username: $("#username").val(),
        password: $("#password").val()
    }
    All.adminLogin(form);
})

const checkLogin = (session) => {
    if (localStorage.getItem(session)!=null) {
        window.location.replace('index.html');
    }
}