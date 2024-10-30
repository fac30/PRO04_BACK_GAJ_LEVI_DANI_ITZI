"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loadJWTStrategy;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const userModel_1 = require("../models/userModel");
const JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.issuer = process.env.JWT_ISSUER;
opts.audience = process.env.JWT_AUDIENCE;
function loadJWTStrategy() {
    passport_1.default.use(new JwtStrategy(opts, function (jwt_payload, done) {
        const user = (0, userModel_1.getUserByEmail)(jwt_payload.email);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }));
}
