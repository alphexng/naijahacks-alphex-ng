import UserM from "../middleware/user";
import Validate from "../middleware/validate";
import User from "../controllers/userControl";
import Admin from "../controllers/adminControl";
import Election from "../controllers/electionControl";
import ElectionM from "../middleware/election";
import tokendecode from "../jwt/decode";

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

    app.post(
        '/api/election',
        tokendecode,
        UserM.verifyAdminToken,
        Validate.validateElection,
        ElectionM.checkExistingElection,
        ElectionM.addNewElection,
        Election.newElection
    )

    app.post(
        '/api/election/:id/candidate',
        tokendecode,
        UserM.verifyAdminToken,
        Validate.validateCandidate,
        ElectionM.checkElectionID,
        ElectionM.checkExistingCandidate,
        ElectionM.addNewCandidate,
        Election.newCandidate
    )

    app.get(
        '/api/election/:category',
        tokendecode,
        ElectionM.getElectionByCategory,
        Election.getElectionByCategory
    )
}

export default Route;