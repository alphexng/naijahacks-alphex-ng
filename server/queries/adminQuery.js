class AdminQuery {
    static checkAdminQuery (username) {
        return {
            text: `
            SELECT * FROM admin WHERE username = $1`,
            values: [username]
        }
    }
}

export default AdminQuery;
