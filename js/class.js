const path = 'https://alphexng-election.herokuapp.com';

class AlphexElection {
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
                    FastFood.errCall(data.message,response.status)
                    cb(response.status,data);
                    return response.status;
                });
            }
        )
        .catch((err) => {
            loader.classList.add('hide');
            FastFood.errCall('Connection to the server failed',500);
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
            FastFood.errCall('Connection to the server failed',500);
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
                    console.log(data);
                }
            }
        )
    }
}