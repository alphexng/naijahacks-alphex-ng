class Admin {
    static login (req,resp) {
        resp.status(200).send({
            status: "success",
            message: 'Login successful',
            token: req.token,
            user: req.user
        })
    }
}

export default Admin;
