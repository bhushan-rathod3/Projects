import { useForm } from "react-hook-form";
import { registerSchema, registerSchemaType } from "./registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function ReactHookFormZod() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: registerSchemaType) => {
    console.log(data);
    reset();
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Name"
        {...register("name", {
          required: "Please Enter Name",
        })}
      />
      {errors.name && <p>{errors.name.message}</p>}
      <input
        type="email"
        placeholder="email"
        {...register("email", {
          required: "email is required",
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input type="password" placeholder="password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}
      <input
        type="password"
        placeholder="confirm password"
        {...register("confirmpass")}
      />
      {errors.confirmpass && <p>{errors.confirmpass.message}</p>}
      <button disabled={isSubmitting} type="submit">
        Submit
      </button>
    </form>
  );
}

export default ReactHookFormZod;
