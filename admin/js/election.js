const Al = AlphexElection;

$("#add-election-form").submit((e) => {
    e.preventDefault();
    $("#loader").removeClass("hide")

    const form = {
        title: $("#title").val(),
        category: $("#election-cat").val(),
        start: $("#start-date").val(),
        end: $("#end-date").val()
    }

    Al.addElection(form);
})

const grabURL = (str) => {
    const href = window.location.href;
    const get = href.indexOf(str);
    const ret = href.substring(get+str.length,href.length);
    return ret;
}

$("#add-candidate-form").submit((e) => {
    e.preventDefault();
    $("#loader").removeClass("hide")

    const form = {
        firstname: $("#firstname").val(),
        surname: $("#surname").val(),
        dob: $("#dob").val(),
        email: $("#email").val(),
        address: $("#location").val(),
        political_party: $("#political-party").val(),
        tenure: $("#tenure").val(),
        current_office: $("#current_office").val()
    }

    const elect = grabURL('?election=');
    Al.addCandidate(form,elect);
})

const getCandidates = (session) => {
    $("#loader").removeClass("hide");
    const href = window.location.href;
    const get = href.indexOf('?election=');
    if (get < 0) {
        location.href='index.html';
        return;
    }
    const str = href.substring(get+10,href.length);
    Al.getOneElection(str,session);
    Al.getCandidates(str,session);
}
