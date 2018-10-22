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

if (localStorage.getItem('electionVoter')!=null) {
    window.location.replace('index.html');
}