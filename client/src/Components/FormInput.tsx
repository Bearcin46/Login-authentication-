import React from "react";
interface inputs {
  type?: string;
  name: string;
  placeholder: string;
  register: object;
  label: string;
  error: string | any;
}

const FormInput: React.FC<inputs> = ({
  type = "text",
  name,
  placeholder,
  register,
  label,
  error,
}) => {
  return (
    <div className="flex flex-col relative mb-2">
      <label className="mt-4 " htmlFor={name}>
        {label}
      </label>
      <input
        className="rounded outline-none px-4 py-2 mt-1 text-black tracking-wide"
        name={name}
        type={type}
        placeholder={placeholder}
        {...register}
      />
      {error && (
        <small className="absolute left-1 bottom-[-18px] text-xs font-semibold text-red-800 ">
          {error.message}
        </small>
      )}
    </div>
  );
};

export default FormInput;
