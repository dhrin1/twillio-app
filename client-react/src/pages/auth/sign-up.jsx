import React from "react";
import { NavLink } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Loader from "@/components/shared/loader-spinner";
import { useSignUpMutation } from "@/pages/auth/services/mutations";
import useRequestHandleError from "@/hooks/useRequestHandleError";

export default function SignUp() {
  const {
    isPending,
    isError,
    error,
    mutateAsync: registerMutation,
  } = useSignUpMutation();

  const [requestError] = useRequestHandleError({ error });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (e) => {
    await registerMutation({
      name: e.name,
      email: e.email,
      password: e.password,
      confirmPassword: e.confirmPassword,
    });
  };

  return (
    <section className="max-w-md w-full">
      <div className="flex flex-col space-y-4">
        <h2 className="text-3xl font-medium">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid space-y-2">
            <div>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                {...register("name", { required: "Full name is required." })}
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
              {isError && (
                <span className="text-xs text-red-500">
                  {requestError?.name}
                </span>
              )}
            </div>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                {...register("email", { required: "Email is required." })}
              />
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
              {isError && (
                <span className="text-xs text-red-500">
                  {requestError?.email}
                </span>
              )}
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                {...register("password", { required: "Password is required." })}
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
              {isError && (
                <span className="text-xs text-red-500">
                  {requestError?.password}
                </span>
              )}
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required.",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-min max-md:w-full"
            >
              <Loader isPending={isPending} className="size-4" />
              Submit
            </Button>
          </div>
        </form>
        <hr />
        <p className="text-sm max-md:text-center">
          Already have an acccount?
          <span className="hover:underline ml-1">
            <NavLink to="/login">Login</NavLink>
          </span>
        </p>
      </div>
    </section>
  );
}
