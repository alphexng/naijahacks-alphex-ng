const Al = AlphexElection;

$("#voterLogin").submit((e) => {
    e.preventDefault();

    const form = new FormData(this[0]);
    Al.userLogin(form);
})