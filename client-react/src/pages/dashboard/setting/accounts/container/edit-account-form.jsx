import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import Loader from "@/components/shared/loader-spinner";
import { useUpdateAccountMutation } from "../services/mutations";
import { useBaseSingleAccountQuery } from "../services/queries";
import useRequestHandleError from "@/hooks/useRequestHandleError";

export default function EditAccountForm(props) {
  const {
    onClose,
    options: { id },
  } = props;
  const { data: getResponse, isPending: onLoad } = useBaseSingleAccountQuery({
    params: { id },
  });
  const {
    data: upResponse,
    isPending,
    isError,
    error,
    mutateAsync: registerMutation,
  } = useUpdateAccountMutation({ params: { id }, onClose });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      details: {
        number: "",
        prefix: "",
        name: "",
        department: "",
        providerUrl: "",
      },
    },
  });
  const onSubmit = async (e) => {
    const { prefix, number, name, department, providerUrl } = e.details;
    await registerMutation({
      prefix,
      number,
      name,
      department,
      providerUrl,
    });
  };

  useEffect(() => {
    if (getResponse) {
      const { number, prefix, name, department, provider } = getResponse;
      setValue("details", {
        number,
        prefix,
        name,
        department,
        providerUrl: provider,
      });
    }
  }, [getResponse, onLoad]);

  const [requestError] = useRequestHandleError({ error });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-5">
        <div className="grid space-y-2">
          <div>
            <Label htmlFor="number">Number</Label>
            <div className="flex space-x-1">
              <Input
                type="text"
                name="prefix"
                className="w-14 text-center"
                placeholder="1"
                {...register("details.prefix", {
                  required: "Prefix country is required.",
                })}
              />
              <Input
                type="text"
                name="number"
                id="number"
                placeholder="0123456789"
                {...register("details.number", {
                  required: "Number name is required.",
                })}
              />
            </div>
            <div className="flex gap-2">
              {errors.number && (
                <span className="text-xs text-red-500">
                  {errors.number.message}
                </span>
              )}
              {errors.prefix && (
                <span className="text-xs text-red-500">
                  {errors.prefix.message}
                </span>
              )}
              {isError && (
                <span className="text-xs text-red-500">
                  {requestError?.prefix}
                </span>
              )}
              {isError && (
                <span className="text-xs text-red-500">
                  {requestError?.account_number}
                </span>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Account Name"
              {...register("details.name", {
                required: "Account name is required.",
              })}
            />
            <div className="flex gap-1">
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
          </div>
          <div>
            <Label htmlFor="name">Department</Label>
            <Input
              type="text"
              name="department"
              id="department"
              placeholder="General"
              {...register("details.department", {
                required: "Account name is required.",
              })}
            />
            <div className="flex gap-1">
              {errors.department && (
                <span className="text-xs text-red-500">
                  {errors?.department?.message}
                </span>
              )}
              {isError && (
                <span className="text-xs text-red-500">
                  {requestError?.department}
                </span>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="providerUrl">Provider Url</Label>
            <Input
              type="text"
              name="providerUrl"
              id="providerUrl"
              {...register("details.providerUrl", {
                required: "Provider url is required.",
              })}
            />
            <div className="flex gap-1">
              {errors.providerUrl && (
                <span className="text-xs text-red-500">
                  {errors?.providerUrl?.message}
                </span>
              )}
              {isError && (
                <span className="text-xs text-red-500">
                  {requestError?.provider_url}
                </span>
              )}
            </div>
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
