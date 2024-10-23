const express = require("express");
import { Request, Response } from "express";
import passport from "passport";

const router = express.Router();

router.post(
  "/private/",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    res.json({ message: "Access granted to private route" });
  }
);

export default router;
