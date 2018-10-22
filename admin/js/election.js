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
