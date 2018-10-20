import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db';
import jwtkey from '../jwt';
import UserQuery from '../queries/userQuery';

class UserM {
    static loginCredentials (req,resp,next) {
        db.query(
			UserQuery.checkUserQuery(req.body.username),
			(err,res) => {
                if (res.rows.length < 1) {
                    return resp.status(401).send({
                        status:"error",
                        message:"Incorrect username or password"
                    })
                }else{
                    const [user] = res.rows;
                    const id = user.voter_id;
                    const vid = id.substring(id.length-4,id.length);
                    const fname = user.firstname;
                    const fnamex = fname.toLowerCase();
                    const sname = user.surname;
                    const snamex = sname.toLowerCase();
                    const pass = `${fnamex}${snamex}${vid}`;
                    if (pass !== req.body.password) {
                        return resp.status(401).send({
                            status:"error",
                            message:"Incorrect username or password"
                        });
                    }
                    const token = jwt.sign({
                        id:user.id,key:user.email}, jwtkey, {
                        expiresIn: 86400
                    });

                    const users = {
                        id: user.voter_id,
                        name: `${user.firstname} ${user.surname}`,
                        email: user.email,
                        phone: user.phone,
                        address: user.address,
                        lga: user.lga_origin,
                        state: user.state_of_origin,
                        lga_reg: user.lga_registered,
                        state_reg: user.state_registered
                    }

                    req.token = token;
                    req.email = req.body.email;
                    req.user = users;

                    next();
                }
			}
		)
    }
}

export default UserM;
