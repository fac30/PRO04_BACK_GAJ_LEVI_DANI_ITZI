const passport = require('passport');
import { Strategy as LocalStrategy } from 'passport-local';

import { comparePassword } from '../utils/hashUtils';
import { getUserByEmail } from '../models/userModel';

passport.use(new LocalStrategy({
    usernameField: 'email', 
}, async (email, password, done) => {
    try {
        const user = await getUserByEmail(email);
        if (!user) return done(null, false, { message: 'Incorrect email.' });

        const isMatch = await comparePassword(password, user.hashed_password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;
