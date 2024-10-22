import passport from "passport";
import passportJwt from "passport-jwt";
import { getUserByEmail } from "../models/userModel";
import { User } from "../utils/typeBucket";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.issuer = process.env.JWT_ISSUER;
opts.audience = process.env.JWT_AUDIENCE;

export default function loadJWTStrategy() {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      const user: User = getUserByEmail(jwt_payload.email);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
  );
}
