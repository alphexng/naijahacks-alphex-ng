class UserQuery {
    static checkUserQuery (user) {
        return {
            text: `
            SELECT * FROM users WHERE voter_id = $1`,
            values: [user]
        }
    }
}

export default UserQuery;