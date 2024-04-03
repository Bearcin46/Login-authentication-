import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "./FormInput";

interface formDatas {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Signup = () => {
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
      </form>
    </div>
  );
};

export default Signup;
