import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { Link } from "react-router-dom";

interface formDatas {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formDatas>({});

  const formSubmit: SubmitHandler<formDatas> = (data) => {
    console.log(data);
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
