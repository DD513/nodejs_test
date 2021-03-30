import { defaults } from 'lodash';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import UserService from '../service/user';
import {Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

require('dotenv').config();

//jwt options
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.APP_KEY
    
}

// calcExpireTime = (payload)=> {
//     const {expireTime} = payload;
//     const currentTime = new Data().getTime();
//     if (currentTime > expireTime) {
//         return false;
//     }
//     return true
// }



passport.use(new LocalStrategy ({
    usernameField:'email',
},(async (email,password,callback)=>{
    //database
    const user = await UserService.getUser(email);
    if (!user) {
        return callback({ status: 404, message: '找不到此用戶'}, false)
    }
    //database compare
    if (password !== user.password) {
        return callback ({ status : 400, message: '輸入的密碼有誤'}, false)
    }
    
    return callback (null, true)
})));

passport.use(new JwtStrategy(options,async (payload, callback) => {
    //expireTime , id
    const currentTime = new Date().getTime();
    if(currentTime > payload.expirTime) {
        return callback({ status: 400, message: 'Token 過期 請重新登入'})
    } 
    return callback (null, payload)
}))

export default passport;