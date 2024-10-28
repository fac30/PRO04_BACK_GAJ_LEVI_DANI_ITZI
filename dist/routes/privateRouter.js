"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport_1 = __importDefault(require("passport"));
const router = express.Router();
router.post("/private/", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ message: "Access granted to private route" });
});
exports.default = router;
