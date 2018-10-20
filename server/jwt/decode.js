import jwt from 'jsonwebtoken';
import jwtkey from './index';

const tokendecode = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({
            status: 'error',
            message: 'No token provided.'
        });
    }
    jwt.verify(token, jwtkey, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                status: 'error', message: 'Unauthorized token'
            });
        }
        req.tokenId = decoded.id;

        next();
    })
}

export default tokendecode;