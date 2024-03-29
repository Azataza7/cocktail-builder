import { NextFunction, Request, Response, Router } from "express";
import { imagesUpload } from "../multer";
import { newUserData } from "../types";
import mongoose from "mongoose";
import User from "../models/User";
import { randomUUID } from "crypto";
import {OAuth2Client} from "google-auth-library"
import config from "../config";

const userRouter = Router();
const client = new OAuth2Client(config.google.clientId);

userRouter.post("/", imagesUpload.single("avatar"), 
async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, displayName } = req.body;
    const userAvatar = req.file;

    if (!userAvatar) {
      return res.status(400).send({ error: 'Avatar field is required' });
    };

    const newUser: newUserData = {
      email: email,
      password: password,
      displayName: displayName,
      avatar: userAvatar.filename,
    };

    const user = new User(newUser);

    user.generateToken();

    await user.save();
    res.status(201).send({ message: "ok", user });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

userRouter.post("/google", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: "Google login error" });
    }

    const email = payload["email"];
    const id = payload["sub"];
    const displayName = payload["name"];
    const avatar = payload["picture"];

    if (!email) {
      res.status(400).send({ error: "Email is not presented" });
    }

    let user = await User.findOne({ googleID: id });

    if (!user) {
      user = new User({
        email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName,
        avatar,
      });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: "you authenticated by Google!", user });
  } catch (e) {
    return next(e);
  }
});

userRouter.post("/sessions", async (req, res, next) => {
  try {
    const token = randomUUID();

    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await user.checkPassword(req.body.password))) {
      return res.status(400).send({ error: "email or password is wrong" });
    }

    user.token = token;
    await user.save();
    return res.send({ message: "Success!", user });
  } catch (e) {
    next(e);
  }
});

userRouter.delete("/sessions", async (req, res, next) => {
  try {
    const token = req.get("Authorization");

    if (!token) {
      return res.send({ message: "No token or invalid" });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send({ error: "User not Found" });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: "Success" });
  } catch (e) {
    return next(e);
  }
});

export default userRouter;