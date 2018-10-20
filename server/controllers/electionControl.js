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
}

export default Election;
