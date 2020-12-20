import jwt from 'jsonwebtoken';
import { JWTSECRETS } from '../../config/config';
import { User, UserModel } from '../user/model/user';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

export const createToken = (user: UserModel) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      rol: user.rol
    },
    JWTSECRETS,
    {
      expiresIn: '8h'
    }
  );
};

const StrategyOpts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWTSECRETS
};

export const jwtStrategy = new Strategy(StrategyOpts, async (payload, done) =>{
  try {
    const user = await User.findById(payload.id);
    if(user){
      return done(null, user);
    }
    return done(null, false, { message: 'Invalid credentials'});
  } catch (error) {
    console.error(error);
  }
});
