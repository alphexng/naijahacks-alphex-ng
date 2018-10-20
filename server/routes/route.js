import UserM from "../middleware/user";
import Validate from "../middleware/validate";
import User from "../controllers/userControl";

const Route = (app) => {
    app.post(
        '/api/auth/login',
        Validate.validateLogin,
        UserM.loginCredentials,
        User.login
    )
}

export default Route;