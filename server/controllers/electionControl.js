class Election {
    static newElection (req,resp) {
        return resp.status(201).send({
            status: 'success',
            message: 'New Election Inserted'
        })
    }

    static newCandidate (req,resp) {
        return resp.status(201).send({
            status: 'success',
            message: 'New Candidate Added'
        })
    }

    static getElectionByCategory (req,resp) {
        return resp.status(201).send({
            status: 'success',
            message: 'Returning all available elections',
            elections: req.elections
        })
    }
}

export default Election;
