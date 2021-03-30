import { defaults } from 'lodash';
import passport from './passport';
import jwt from 'jsonwebtoken';
import { token } from 'morgan';

require('dotenv').config();

class UserMiddleware {
    decodeToken = (token) => {
        try {
            return jwt.verify(token , process.env.APP_KEY)
        } catch (error) {
            return false;
        }
    }
    
    Authenticate = (req, res, next) => {
        passport.authenticate('local', {session: false},(error,user)=>{
            if (error) {
                const { status, message } = error ;
                res.status(status).json({message})
                return;
            }
            if(!user) {
                res.status(401).json({message:'登入失敗'});
                return;
            }
            const {email} = user;
            const data = {
                email,
                expireTime: new Date().getTime() + 10 * 60 * 1000
            }
            const token = jwt.sign(data, process.env.APP_KEY)
            res.status(200).json({ message: '登入成功',token});
        })(req, res, next);
    }
    jwtAuthenticate = async(req, res, next)=> {
        passport.authenticate('jwt', {session:false}, (error, user, info) => {
            if (info) {
                res.status(401).json({ message: '尚未登入'})
                return;
            }
            if (error) {
                const {status, message } = erroe;
                res.status(status).json({ message })
                return;
            }
            const { email } = user;
            req.email = email;
            next();
            
        })(req, res, next)
    }

}

export default new UserMiddleware();