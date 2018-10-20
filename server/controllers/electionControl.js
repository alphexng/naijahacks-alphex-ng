class Election {
    static newElection (req,resp) {
        return resp.status(201).send({
            status: 'success',
            message: 'New Election Inserted'
        })
    }
}

export default Election;
