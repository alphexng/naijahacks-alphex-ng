import UserM from "../middleware/user";
import Validate from "../middleware/validate";
import User from "../controllers/userControl";
import Admin from "../controllers/adminControl";

const Route = (app) => {
    app.post(
        '/api/auth/login',
        Validate.validateLogin,
        UserM.loginCredentials,
        User.login
    )

    app.post(
        '/api/auth/admin',
        Validate.validateLogin,
        UserM.adminLoginCredentials,
        Admin.login
    )
}

export default Route;