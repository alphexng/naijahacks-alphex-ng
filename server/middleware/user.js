import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db';
import jwtkey from '../jwt';
import UserQuery from '../queries/userQuery';
import AdminQuery from '../queries/adminQuery';

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
                        id:user.voter_id}, jwtkey, {
                        expiresIn: 86400 * 365
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

    static adminLoginCredentials (req,resp,next) {
        db.query(
			AdminQuery.checkAdminQuery(req.body.username),
			(err,res) => {
                if (res.rows.length < 1) {
                    return resp.status(401).send({
                        status:"error",
                        message:"Incorrect username or password"
                    })
                }else{
                    const [user] = res.rows;
                    const pass = bcrypt.compareSync(
                        req.body.password,
                        user.password
                    );
                    if (!pass) {
                        return resp.status(401).send({
                            status:"error",
                            message:"Incorrect username or password"
                        });
                    }
                    const token = jwt.sign({
                        id: user.username}, jwtkey, {
                        expiresIn: 86400 * 365
                    });

                    const admin = {
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }

                    req.token = token;
                    req.user = admin;
                    req.email = req.body.email

                    next();
                }
			}
		)
    }
    
    static verifyAdminToken (req,resp,next) {
        const toks = req.tokenId;

        db.query(AdminQuery.checkAdminQuery(toks))
        .then((res) => {
            if (res.rows.length < 1) {
                return resp.status(401).send({
                    status: 'error',
                    message: 'You are not authorized'
                })
            }else{
                next();
            }
        })
    }
}

export default UserM;
