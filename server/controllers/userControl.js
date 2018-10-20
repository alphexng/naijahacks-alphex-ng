class User {
    static login (req,resp) {
        return resp.status(200).send({
            status: "success",
            message: 'Login successful',
            token: req.token,
            user: req.user
        })
    }
}

export default User;
