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
            return resp.status(500).send({
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
            next();
        })
        .catch((err) => {
            return resp.status(500).send({
                status: 'error',
                message: 'You encountered a server error'
            })
        })
    }

    static checkElectionID (req,resp,next) {
        const election = req.params.id;
        db.query(ElectionQuery.checkElectionID(election))
        .then((res) => {
            if (res.rows.length < 1) {
                return resp.status(404).send({
                    status: 'error',
                    message: 'This election does not exist or is no longer available'
                })
            }else{
                next();
            }
        })
    }

    static checkExistingCandidate (req,resp,next) {
        db.query(ElectionQuery.checkExistingCandidate(
            req.params.id,
            req.body.firstname,
            req.body.surname,
            req.body.email
        ))
        .then((res) => {
            if (res.rows.length > 0) {
                return resp.status(400).send({
                    status: 'error',
                    message: 'This candidate already exists for this election'
                })
            }else{
                next();
            }
        })
        .catch((err) => {
            return resp.status(500).send({
                status: 'error',
                message: 'The server encountered an error'
            })
        })
    }

    static addNewCandidate (req,resp,next) {
        const candidate_id = Extra.randNumb('candidate_');
        const election = req.params.id;
        db.query(ElectionQuery.addCandidate(
            candidate_id,
            req.body.firstname,
            req.body.surname,
            req.body.dob,
            req.body.email,
            req.body.address,
            election,
            req.body.political_party,
            req.body.tenure,
            req.body.current_office
        ))
        .then((res) => {
            next();
        })
        .catch((err) => {
            return resp.status(500).send({
                status: 'error',
                message: 'You encountered a server error'
            })
        })
    }

    static getElectionByCategory (req,resp,next) {
        db.query(ElectionQuery.getElectionByCategory(
            req.params.category
        ))
        .then((res) => {
            if (res.rows.length < 1) {
                return resp.status(404).send({
                    status: 'error',
                    message: 'There are no active elections'
                })
            }else{
                const ret = res.rows;
                req.elections = ret;
                next();
            }
        })
        .catch((err) => {
            return resp.status(500).send({
                status: 'error',
                message: 'You encountered a server error'
            })
        })
    }

    static getElectionCandidates (req,resp,next) {
        db.query(ElectionQuery.getElectionCandidates(
            req.params.id
        ))
        .then((res) => {
            if (res.rows.length < 1) {
                return resp.status(404).send({
                    status: 'error',
                    message: 'There are no candidates yet'
                })
            }else{
                const ret = res.rows;
                req.elections = ret;
                next();
            }
        })
        .catch((err) => {
            return resp.status(500).send({
                status: 'error',
                message: 'You encountered a server error'
            })
        })
    }

    static updateElectionStatus (req,resp,next) {
        db.query(ElectionQuery.updateElectionStatus(
            req.params.id,
            req.body.status
        ))
        .then((res) => {
            const [ret] = res.rows;
            const stats = {
                id: ret.election_id,
                title: ret.title,
                status: ret.status
            }
            req.stats = stats;
            next();
        })
        .catch((err) => {
            return resp.status(500).send({
                status: 'error',
                message: 'You encountered a server error'
            })
        })
    }

    static checkCandidateID (req,resp,next) {
        const candidate = req.params.candidate;
        const election = req.params.id;

        db.query(ElectionQuery.checkCandidateID(
            candidate,
            election
        ))
        .then((res) => {
            if (res.rows.length < 1) {
                return resp.status(404).send({
                    status: 'error',
                    message: 'This candidate does not exist for the specified election'
                })
            }else{
                next();
            }
        })
    }

    static checkUserVote (req,resp,next) {
        db.query(ElectionQuery.checkUserVote(
            req.tokenId,
            req.params.id
        ))
        .then((res) => {
            if (res.rows.length > 0) {
                return resp.status(400).send({
                    status: 'error',
                    message: 'You have already voted'
                })
            }else{
                next();
            }
        })
        .catch((err) => {
            return resp.status(500).send({
                status: 'error',
                message: 'The server encountered an error'
            })
        })
    }

    static placeVote (req,resp,next) {
        db.query(ElectionQuery.placeVote(
            req.tokenId,
            req.params.candidate,
            req.params.id
        ))
        .then((res) => {
            next();
        })
        .catch((err) => {
            return resp.status(500).send({
                status: 'error',
                message: 'You encountered a server error'
            })
        })
    }

    static getOneElection (req,resp,next) {
        db.query(ElectionQuery.getOneElection(
            req.params.id
        ))
        .then((res) => {
            if (res.rows.length < 1) {
                return resp.status(404).send({
                    status: 'error',
                    message: 'This election does not exist'
                })
            }else{
                const [ret] = res.rows;
                req.election = ret;
                next();
            }
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
