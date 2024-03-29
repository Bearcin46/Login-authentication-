import mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import * as Joi from "joi";
import * as PasswordComplexity from "joi-password-complexity";

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

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: PasswordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};
