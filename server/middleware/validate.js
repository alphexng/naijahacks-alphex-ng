import Extra from '../extra/extra';

class Validate {
    static validateLogin (req,resp,next) {
        const username = req.body.username;
        const password = req.body.password;
        
        if (username==null
            || username.length===0
            || Extra.hasWhiteSpace(username)) {
            return resp.status(400).send({
                status: "error",
                message: "Username field cannot be left empty"
            })
        }
        if (password==null
            || password.length===0
            || Extra.hasWhiteSpace(password)) {
            return resp.status(400).send({
                status: "error",
                message: "Password field cannot be left empty"
            })
        }
        if (Extra.validateInput(password,8,50)===false) {
            return resp.status(400).send({
                status: "error",
                message: "Password: Min Character - 8,Max character - 50"
            })
        }

        next();
    }

    static validateElection (req,resp,next) {
        const title = req.body.title;
        const category = req.body.category;
        const start = req.body.start;
        const end = req.body.end;

        if (title==null
            || title.length===0
            || Extra.hasWhiteSpace(title)) {
            return resp.status(400).send({
                status: "error",
                message: "Title field cannot be left empty"
            })
        }
        if (category==null
            || category.length===0
            || Extra.hasWhiteSpace(category)) {
            return resp.status(400).send({
                status: "error",
                message: "Category field cannot be left empty"
            })
        }
        if (start==null
            || start.length===0
            || Extra.hasWhiteSpace(start)) {
            return resp.status(400).send({
                status: "error",
                message: "Please add a proposed kick off date for election"
            })
        }
        if (end==null
            || end.length===0
            || Extra.hasWhiteSpace(end)) {
            return resp.status(400).send({
                status: "error",
                message: "Please add a proposed date for election to end"
            })
        }

        next();
    }

    static validateCandidate (req,resp,next) {
        const firstname = req.body.firstname;
        const surname = req.body.surname;
        const dob = req.body.dob;
        const email = req.body.email;
        const address = req.body.address;
        const political_party = req.body.political_party;
        const tenure = req.body.tenure;
        const current_office = req.body.current_office;
        if (firstname==null
            || firstname.length===0
            || Extra.hasWhiteSpace(firstname)) {
            return resp.status(400).send({
                status: "error",
                message: "Firstname field cannot be left empty"
            })
        }
        if (surname==null
            || surname.length===0
            || Extra.hasWhiteSpace(surname)) {
            return resp.status(400).send({
                status: "error",
                message: "Surname field cannot be left empty"
            })
        }
        if (dob==null
            || dob.length===0
            || Extra.hasWhiteSpace(dob)) {
            return resp.status(400).send({
                status: "error",
                message: "DOB field cannot be left empty"
            })
        }
        if (email==null
            || email.length===0
            || Extra.hasWhiteSpace(email)) {
            return resp.status(400).send({
                status: "error",
                message: "Email field cannot be left empty"
            })
        }
        if (Extra.validateEmail(email)===false){
            return resp.status(400).send({
                status: "error",
                message: "Invalid email syntax"
            })
        }
        if (address==null
            || address.length===0
            || Extra.hasWhiteSpace(address)) {
            return resp.status(400).send({
                status: "error",
                message: "Address field cannot be left empty"
            })
        }
        if (political_party==null
            || political_party.length===0
            || Extra.hasWhiteSpace(political_party)) {
            return resp.status(400).send({
                status: "error",
                message: "Political Party field cannot be left empty"
            })
        }
        if (tenure==null
            || tenure.length===0
            || Extra.hasWhiteSpace(tenure)) {
            return resp.status(400).send({
                status: "error",
                message: "Tenure field cannot be left empty"
            })
        }
        if (isNaN(tenure)) {
            return resp.status(400).send({
                status: 'error',
                message: 'Tenure parameter must be a number'
            });
        }
        if (current_office==null
            || current_office.length===0
            || Extra.hasWhiteSpace(current_office)) {
            return resp.status(400).send({
                status: "error",
                message: "Current Office field cannot be left empty"
            })
        }

        next();
    }
    
    static validateElectionUpdateStatus (req,resp,next) {
        const status = req.body.status;
        const statusArr = ['pending','ongoing','finished'];
        
        if (status==null
            || status.length===0
            || Extra.hasWhiteSpace(status)) {
            return resp.status(400).send({
                status: "error",
                message: "Status field cannot be left empty"
            })
        }

        if (statusArr.includes(status) != true) {
            return resp.status(400).send({
                status: 'error',
                message: 'The status you entered is invalid'
            });
        }

        next();
    }
}

export default Validate;
