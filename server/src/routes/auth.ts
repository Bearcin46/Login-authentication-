import { Router } from "express";
import { UserModel } from "Users";
import joi from "joi";
import bcrypt from "bcrypt";

export const router = Router();
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await UserModel.findOne({ email: req.body.email });

    if (!user)
      return res.status(401).send({ message: "Invalid email or Password" });
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validatePassword)
      return res.status(401).send({ message: "Invalid email or Password" });
    const token = await user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

const validate = (data: any) => {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: joi.string().required().label("Password"),
  });
  return schema.validate(data);
};
