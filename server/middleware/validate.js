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
}

export default Validate;
