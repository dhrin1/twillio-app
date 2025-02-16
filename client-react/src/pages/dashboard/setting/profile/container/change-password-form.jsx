import React from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePasswordMutation } from "../services/mutations";
import { useForm } from "react-hook-form";

import Loader from "@/components/shared/loader-spinner";
import useRequestHandleError from "@/hooks/useRequestHandleError";

export default function ChangePasswordForm() {
  const {
    mutateAsync: registerMutation,
    isPending: onUpdateLoad,
    isError,
    error,
  } = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    await registerMutation({
      currentPassword: e.currentPassword,
      newPassword: e.newPassword,
      confirmPassword: e.confirmPassword,
    });
  };

  const [requestError] = useRequestHandleError({ error });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="grid gap-3">
        <div>
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            type="password"
            name="currentPassword"
            id="currentPassword"
            {...register("currentPassword", {
              required: "Current password is required.",
            })}
          />
          <div className="flex space-x-2">
            {errors?.currentPassword && (
              <span className="text-xs text-red-500">
                {errors?.currentPassword?.message}
              </span>
            )}
            {isError && (
              <span className="text-xs text-red-500">
                {requestError?.current_password}
              </span>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type="password"
            name="newPassword"
            id="newPassword"
            {...register("newPassword", {
              required: "New password is required.",
            })}
          />
          <div className="flex space-x-2">
            {errors?.newPassword && (
              <span className="text-xs text-red-500">
                {errors?.newPassword?.message}
              </span>
            )}
            {isError && (
              <span className="text-xs text-red-500">
                {requestError?.password}
              </span>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm password is required.",
            })}
          />
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button type="submit" disabled={onUpdateLoad}>
          <Loader isPending={onUpdateLoad} className="size-4" />
          Save
        </Button>
      </CardFooter>
    </form>
  );
}
