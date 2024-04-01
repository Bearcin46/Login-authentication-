import mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import joi from "joi";
import passwordComplexity from "joi-password-complexity";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this.id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

export const UserModel = mongoose.model("users", UserSchema);

export const validate = (data: string) => {
  const schema = joi.object({
    firstName: joi.string().required().label("First Name"),
    lastName: joi.string().required().label("Last Name"),
    email: joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};
