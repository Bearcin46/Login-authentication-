import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { Link, Navigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

interface formDatas {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const formSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be atleast 3 characters" })
    .max(20, { message: "First name should not exceed 20 characters" }),
  lastName: z
    .string()
    .min(3, { message: "First name must be atleast 3 characters" })
    .max(20, { message: "First name should not exceed 20 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password should be atleast 8 characters" }),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formDatas>({ resolver: zodResolver(formSchema) });

  const formSubmit: SubmitHandler<formDatas> = async (data, e) => {
    e?.preventDefault();
    try {
      const url = "http://localost:1234/api/auth";
      const { data: res } = await axios.post(url, data);
      <Navigate to="/login" />;
      console.log(res.message);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Hi all im signup</h1>
      <form action="" onSubmit={handleSubmit(formSubmit)}>
        {/* first name */}
        <FormInput
          label={"Enter your First Name"}
          name={"firstName"}
          placeholder={"Enter your First Name"}
          register={register("firstName")}
          error={errors.firstName}
        />

        {/* last name */}
        <FormInput
          label={"Enter your Last Name"}
          name={"lastName"}
          placeholder={"Enter your Last Name"}
          register={register("lastName")}
          error={errors.lastName}
        />

        {/* email*/}
        <FormInput
          label={"Enter your Email"}
          name={"email"}
          placeholder={"Enter your Email"}
          register={register("email")}
          error={errors.email}
        />

        {/* password */}
        <FormInput
          label={"Enter your Password"}
          name={"password"}
          type={"password"}
          placeholder={"Enter your Password"}
          register={register("password")}
          error={errors.password}
        />

        <button className="bg-green-500 px-4 py-2">Submit</button>
        <p>
          Already have a account?{" "}
          <span className="text-blue-600">
            <Link to="/login">Login Here</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
