import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { Link, Navigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

interface formDatas {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password should be atleast 8 characters" }),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formDatas>({ resolver: zodResolver(formSchema) });

  const formSubmit: SubmitHandler<formDatas> = async (data) => {
    try {
      const url = "http://localhost:1234/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.datas);

      <Navigate to="/" />;
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Login to your Account</h1>
      <form action="" onSubmit={handleSubmit(formSubmit)}>
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
        <button className="px-4 py-2 bg-green-600">Login</button>
        <p>
          New Here?
          <span className="text-blue-600">
            <Link to="/signup">Register Now</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
