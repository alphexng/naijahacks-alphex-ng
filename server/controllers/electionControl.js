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
        return resp.status(200).send({
            status: 'success',
            message: 'Returning all available elections',
            elections: req.elections
        })
    }

    static getElectionCandidates (req,resp) {
        return resp.status(200).send({
            status: 'success',
            message: 'Returning all candidates',
            candidates: req.elections
        })
    }

    static updateElectionStatus (req,resp) {
        return resp.status(200).send({
            status: 'success',
            message: 'Election status updated',
            election: req.stats
        })
    }
}

export default Election;
