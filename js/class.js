const path = 'https://alphexng-election.herokuapp.com';

class AlphexElection {
    static filterDate (date) {
        const d = new Date(date);
        const day = d.getDate();
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        return `${day} - ${month} - ${year}`;
    }

    static modal (el,attr,event) {
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
      
      static closeModal (el,event) {
        const element = document.getElementById(el);
        document.addEventListener(event,(e)=>{
            if (!e.target.matches('#'+el)) return;
            element.classList.remove("modal-show");
        })
      }

    static initUser () {
        if (localStorage.getItem('electionVoter')!=null) {
            const user = JSON.parse(localStorage.getItem('electionVoter'));
            $(".name").html(user.user.name)
        }
    }
    static errCall (e,s) {
        const error = document.getElementsByClassName('error');
        if (s == 200 || s == 201) {
            for (let i = 0; i < error.length; i++) {
                const err = error[i];
                error[i].classList.remove('hide');
                error[i].classList.remove('red');
                error[i].classList.add('green');
                error[i].innerHTML = e;
            }
        }else{
            const loader = document.getElementById('loader');
            loader.classList.add('hide');
            for (let i = 0; i < error.length; i++) {
                const err = error[i];
                error[i].classList.remove('hide');
                error[i].classList.add('red');
                error[i].innerHTML = e;
            }
        }
    }

    static fetchPost (url, headers, body, cb) {
        fetch(path + url, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(
            (response) => {
                response.json().then(function(data) {
                    AlphexElection.errCall(data.message,response.status)
                    cb(response.status,data);
                    return response.status;
                });
            }
        )
        .catch((err) => {
            loader.classList.add('hide');
            AlphexElection.errCall('Connection to the server failed',500);
        });
    }

    static fetchGet (url, headers, cb) {
        fetch(path + url, {
            method: 'get',
            headers: headers
        })
        .then(
            (response) => {
                response.json().then(function(data) {
                    cb(response.status,data);
                    return response.status;
                });
            }
        )
        .catch((err) => {
            AlphexElection.errCall('Connection to the server failed',500);
        });
    }

    static userLogin (body) {
        this.fetchPost(
            '/api/auth/login',
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body,(res,data) => {
                if (res==200) {
                    setTimeout(()=>{window.location.href='index.html'},1200)
                    const user = {
                        token: data.token,
                        user: data.user
                    }
                    localStorage.setItem('electionVoter',JSON.stringify(user));
                }
            }
        )
    }

    static adminLogin (body) {
        this.fetchPost(
            '/api/auth/admin',
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body,(res,data) => {
                if (res==200) {
                    setTimeout(()=>{window.location.href='index.html'},1200)
                    const user = {
                        token: data.token,
                        user: data.user
                    }
                    localStorage.setItem('electionAdmin',JSON.stringify(user));
                }
            }
        )
    }

    static addElection (body) {
        const admin = JSON.parse(localStorage.getItem('electionAdmin'));
        const token  = admin.token;
        this.fetchPost(
            '/api/election',
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token
            },
            body,(res,data) => {
                if (res==201) {
                    setTimeout(()=>{window.location.reload(true)},1200);
                }
            }
        )
    }

    static getElectionByCategory (category,session) {
        const user = JSON.parse(localStorage.getItem(session));
        const token  = user.token;

        this.fetchGet(
            `/api/election/category/${category}`,
            {
                'x-access-token': token
            },
            (res,data) => {
                $("#loader").addClass("hide");
                if (res==200) {
                    const elect = data.elections;
                    let election = '';
                    for (let i = 0; i < elect.length; i++) {
                        const x = elect[i];
                        election += `
                        <article class="card">
                            <img src="img/flag-img.jpg" alt="Flag Image">
                            <div class="card-text">
                            <p><span>${x.title}</span></p>
                            </div>
                            <div class="card-btn">
                            <a href="single-election.html?election=${x.election_id}" class="card-btn">View</a>
                            </div>
                        </article>`;
                    }
                    $("#electionCategory").html(election);
                }else{
                    $("#electionCategory").html(`<p class="errorMessage">${data.message}</p>`);
                }
            }
        )
    }

    static getCandidates (election,session) {
        const user = JSON.parse(localStorage.getItem(session));
        const token  = user.token;
        this.fetchGet(
            `/api/election/${election}/candidates`,
            {
                'x-access-token': token
            },
            (res,data) => {
                $("#loader").addClass("hide");
                if (res==200) {
                    let candidates = '';
                    const cand = data.candidates;
                    for (let i = 0; i < cand.length; i++) {
                        const x = cand[i];
                        const first = `
                        <article class="tab">
                            <ul>
                                <li>${i+1}</li>
                                <li>${x.firstname} ${x.surname}</li>
                                <li>${x.political_party}</li>`;
                        let second = '';
                        if (session=='electionAdmin') {
                            second = `
                                <li>${x.current_office}</li>
                                </ul>
                            </article>`;
                        }else{
                            second = `
                                <li>
                                    <a href="javscript:;" 
                                    cid="${x.candidate_id}" 
                                    cname="${x.firstname} ${x.surname}" 
                                    class="candidate-btn" 
                                    mtarget="voteCandidate">Vote</a>
                                </li>
                                </ul>
                            </article>`;
                        }
                        candidates += first+second;

                    }
                    $("#allCandidates").html(candidates);
                    $(".candidate-btn").click(function(){
                        $("#candidateName").html($(this).attr("cname"));
                        $("#positiveVote").val($(this).attr("cid"));
                    })
                    $("#closeVoteModal").click(function(){
                        $("#voteCandidate").click();
                    })
                    AlphexElection.modal('candidate-btn','mtarget','click');
                    AlphexElection.closeModal('voteCandidate','click');
                }else{
                    $("#allCandidates").html(`<p class="errorMessage">${data.message}</p>`);
                }
            }
        )
    }

    static addCandidate (body,election) {
        const admin = JSON.parse(localStorage.getItem('electionAdmin'));
        const token  = admin.token;
        this.fetchPost(
            `/api/election/${election}/candidate`,
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token
            },
            body,(res,data) => {
                if (res==201) {
                    setTimeout(()=>{window.location.reload(true)},1200)
                }
            }
        )
    }

    static getOneElection (str,session) {
        const user = JSON.parse(localStorage.getItem(session));
        const token  = user.token;

        this.fetchGet(
            `/api/election/${str}`,
            {
                'x-access-token': token
            },
            (res,data) => {
                $("#loader").addClass("hide");
                if (res==200) {
                    const elect = data.election;
                    $(".electionTitle").html(elect.title);
                    $(".electionStatus").html(elect.status);
                    $(".electionStart").html(AlphexElection.filterDate(elect.date_start));
                    $(".electionEnd").html(AlphexElection.filterDate(elect.date_end));
                }else if (res==404) {
                    window.location.replace('404.html');
                }else{
                    $("#electionCategory").html(`<p class="errorMessage">${data.message}</p>`);
                }
            }
        )
    }

    static placeVote (election,candidate) {
        const user = JSON.parse(localStorage.getItem('electionVoter'));
        const token  = user.token;
        this.fetchPost(
            `/api/election/${election}/vote/${candidate}`,
            {
                'x-access-token': token
            },
            {},
            (res) => {
                if (res==201) {
                    setTimeout(()=>{window.location.reload(true)},1200);
                }else if (res==400) {
                    setTimeout(()=>{window.location.reload(true)},1200);
                }
            }
        )
    }
}

AlphexElection.initUser();