const path = 'https://alphexng-election.herokuapp.com';

class AlphexElection {
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
                    setTimeout(()=>{window.location.reload(true)},1200)
                }
            }
        )
    }

    static getElectionByCategory (category,session) {
        const user = JSON.parse(localStorage.getItem(session));
        const token  = user.token;

        this.fetchGet(
            `/api/election/${category}`,
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
                            <p>Election: <span>${x.title}</span></p>
                            </div>
                            <div class="card-btn">
                            <a href="single-election.html" class="card-btn">View</a>
                            </div>
                        </article>`;
                    }
                    $("#electionCategory").html(election);
                }
            }
        )
    }
}

AlphexElection.initUser();