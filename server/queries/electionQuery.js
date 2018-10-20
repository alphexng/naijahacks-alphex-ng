class ElectionQuery {
    static addElection (id,title,category,start,end,admin) {
        return {
            text: `
            INSERT INTO election (
                election_id,
                title,
                category,
                date_start,
                date_end,
                created_by,
                status
            ) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
            values: [id,title,category,start,end,admin,'pending']
        }
    }

    static checkExistingElection (election) {
        return {
            text: `
            SELECT election_id FROM election
            WHERE title = $1 AND status != $2`,
            values: [election,'finished']
        }
    }
}

export default ElectionQuery;
