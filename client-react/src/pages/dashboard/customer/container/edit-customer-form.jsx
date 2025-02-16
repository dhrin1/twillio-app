import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { useUpdateCustomerDetailsMutation } from "../services/mutations";
import { useGetCustomerQuery } from "../services/queries";

import Loader from "@/components/shared/loader-spinner";
import useRequestHandleError from "@/hooks/useRequestHandleError";

export default function EditCustomerForm(props) {
  const {
    onClose,
    options: { id },
  } = props;
  const {
    isPending,
    isError,
    error,
    mutateAsync: registerMutation,
  } = useUpdateCustomerDetailsMutation({ params: { id }, onClose });

  const { data: getResponse, isPending: onLoad } = useGetCustomerQuery({
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
        number: "",
        name: "",
        address: "",
      },
    },
  });
  const onSubmit = async (e) => {
    const { name, number, address } = e.details;
    await registerMutation({
      number,
      name,
      address,
    });
  };

  useEffect(() => {
    if (getResponse) {
      const { number, name, address } = getResponse;
      setValue("details", {
        number,
        name,
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
            <Label htmlFor="number">Account Number</Label>
            <Input
              type="text"
              name="number"
              id="number"
              disabled={true}
              {...register("details.number", {
                required: "Account number is required.",
              })}
            />
            {errors.number && (
              <span className="text-xs text-red-500">
                {errors.number.message}
              </span>
            )}
            {isError.number && (
              <span className="text-xs text-red-500">
                {requestError.number}
              </span>
            )}
          </div>
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
          Save Changes
        </Button>
      </div>
    </form>
  );
}
