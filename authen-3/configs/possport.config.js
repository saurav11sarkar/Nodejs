const passport = require('passport');
const PassAuth = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await PassAuth.findOne({ username });
            if (!user) {
                return done(null, false, { message: "Incorrect Username" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: "Incorrect Password" });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// serialize the user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserialize the user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await PassAuth.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});
