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
}

export default Validate;
