import { Router } from "express";
import { UserModel, validate } from "../Users";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();

export const userRouter = Router();
userRouter.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await UserModel.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists" });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new UserModel({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});
