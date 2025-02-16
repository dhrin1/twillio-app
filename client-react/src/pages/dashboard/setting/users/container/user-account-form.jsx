import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import Loader from "@/components/shared/loader-spinner";
// import { useUpdateAccountMutation } from "../services/mutations";
// import { useBaseSingleAccountQuery } from "../services/queries";
import useRequestHandleError from "@/hooks/useRequestHandleError";
import { Textarea } from "@/components/ui/textarea";

import { useGetUserQuery } from "../services/queries";
import { useUpdateUserMutation } from "../services/mutations";

export default function UserAccountForm(props) {
  const {
    onClose,
    options: { id },
  } = props;
  const {
    isPending,
    isError,
    error,
    mutateAsync: registerMutation,
  } = useUpdateUserMutation({ params: { id }, onClose });

  const { data: getResponse, isPending: onLoad } = useGetUserQuery({
    params: { id },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      details: {
        name: "",
        email: "",
        designation: "",
        address: "",
      },
    },
  });
  const onSubmit = async (e) => {
    const { name, designation, address } = e.details;
    await registerMutation({
      id,
      name,
      designation,
      address,
    });
  };

  useEffect(() => {
    if (getResponse) {
      const { fullName, email, designation, address } = getResponse;
      setValue("details", {
        name: fullName,
        email,
        designation,
        address,
      });
    }
  }, [getResponse, onLoad]);

  const [requestError] = useRequestHandleError({ error });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-5">
        <div className="grid space-y-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              {...register("details.name", {
                required: "Account name is required.",
              })}
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
            {isError.name && (
              <span className="text-xs text-red-500">{requestError.name}</span>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              readOnly={true}
              disabled={true}
              {...register("details.email", {
                required: "Email is required.",
              })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
            {isError.email && (
              <span className="text-xs text-red-500">{requestError.email}</span>
            )}
          </div>
          <div>
            <Label htmlFor="designation">Designation</Label>
            <Input
              type="text"
              name="designation"
              id="designation"
              {...register("details.designation", {
                required: "Designation is required.",
              })}
            />
            {errors.designation && (
              <span className="text-xs text-red-500">
                {errors?.designation?.message}
              </span>
            )}
            {isError.designation && (
              <span className="text-xs text-red-500">
                {requestError.designation}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              name="address"
              id="address"
              {...register("details.address", {
                required: "Deesignation is required.",
              })}
            />
            {errors.address && (
              <span className="text-xs text-red-500">
                {errors?.address?.message}
              </span>
            )}
            {isError.address && (
              <span className="text-xs text-red-500">
                {requestError.address}
              </span>
            )}
          </div>
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-min max-md:w-full "
        >
          <Loader isPending={isPending} className="size-4" />
          Edit
        </Button>
      </div>
    </form>
  );
}
