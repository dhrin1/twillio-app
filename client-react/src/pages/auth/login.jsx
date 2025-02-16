import React from "react";
import { NavLink } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ErrorAlert } from "@/components/shared/error-alert";
import Loader from "@/components/shared/loader-spinner";
import { useLoginMutation } from "@/pages/auth/services/mutations";

export default function LoginPage() {
  const {
    isPending,
    isError,
    error,
    mutateAsync: loginMutation,
  } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (e) => {
    await loginMutation({ email: e.email, password: e.password });
  };

  return (
    <section className="max-w-md w-full ">
      <div className="flex flex-col space-y-4">
        <h2 className="text-3xl font-medium">Login</h2>
        {isError && (
          <ErrorAlert
            title={error?.response?.data?.status}
            content={error?.response?.data?.message}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid space-y-2">
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
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-min max-md:w-full"
            >
              <Loader isPending={isPending} className="size-4" />
              Signin
            </Button>
          </div>
        </form>
        <hr />
        <p className="text-sm max-md:text-center">
          Don't have account?{" "}
          <span className="hover:underline ml-1">
            <NavLink to="/sign-up">Sign up</NavLink>
          </span>
        </p>
      </div>
    </section>
  );
}
