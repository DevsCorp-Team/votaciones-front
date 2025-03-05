import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class Handler {
    static authVerify (req, res, next) {
        let token;
        try {
            token = req.cookies.access_token;
        } catch (e) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!token) return res.status(401).json({ error: 'Unauthorized' });

        jwt.verify(token.token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            
            req.user = decoded;
            next();
        });
    }
}