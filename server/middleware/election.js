import db from "../db";
import ElectionQuery from "../queries/electionQuery";
import Extra from "../extra/extra";

class ElectionM {
    static checkExistingElection (req,resp,next) {
        db.query(ElectionQuery.checkExistingElection(req.body.title))
        .then((res) => {
            if (res.rows.length > 0) {
                return resp.status(400).send({
                    status: 'error',
                    message: 'This election is still active'
                })
            }else{
                next();
            }
        })
        .catch((err) => {
            return resp.status(400).send({
                status: 'error',
                message: 'The server encountered an error'
            })
        })
    }
    static addNewElection (req,resp,next) {
        const election_id = Extra.randNumb('election_');
        db.query(ElectionQuery.addElection(
            election_id,
            req.body.title,
            req.body.category,
            req.body.start,
            req.body.end,
            req.tokenId
        ))
        .then((res) => {
            const [ret] = res.rows;
            next();
        })
        .catch((err) => {
            return resp.status(500).send({
                status: 'error',
                message: 'You encountered a server error'
            })
        })
    }
}

export default ElectionM;
