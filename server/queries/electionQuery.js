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

    static checkElectionID (id) {
        return {
            text: `
            SELECT election_id FROM election
            WHERE election_id = $1 AND status = $2`,
            values: [id,'pending']
        }
    }

    static addCandidate (
        id,firstname,surname,dob,email,address,election,political_party,tenure,current_office) {
        return {
            text: `
            INSERT INTO candidates (
                candidate_id,
                firstname,
                surname,
                dob,
                email,
                address,
                election_id,
                political_party,
                tenure,
                current_office
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            values: [
                id,
                firstname,
                surname,
                dob,
                email,
                address,
                election,
                political_party,
                tenure,
                current_office
            ]
        }
    }

    static checkExistingCandidate (id,firstname,surname,email) {
        return {
            text: `
            SELECT candidate_id FROM candidates
            WHERE election_id = $1
            AND firstname = $2
            AND surname = $3
            AND email = $4`,
            values: [id,firstname,surname,email]
        }
    }

    static getElectionByCategory (category) {
        return {
            text: `
            SELECT election_id,
            title,category,
            date_start,
            date_end,
            created_by,
            status FROM election WHERE category ILIKE $1
            AND status != $2`,
            values: [category,'finished']
        }
    }

    static getElectionCandidates (election) {
        return {
            text: `
            SELECT candidate_id,
            firstname,
            surname,
            dob,
            email,
            address,
            political_party,
            tenure,
            current_office FROM candidates
            WHERE election_id = $1`,
            values: [election]
        }
    }
}

export default ElectionQuery;
