import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import Loader from "@/components/shared/loader-spinner";
import countryCode from "@/assets/json/country-code.json";

import { useCreateAccountMutation } from "../services/mutations";
import useRequestHandleError from "@/hooks/useRequestHandleError";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateAccountForm(props) {
  const { onClose } = props;
  const {
    isPending,
    isError,
    error,
    mutateAsync: registerMutation,
  } = useCreateAccountMutation({ onClose });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (e) => {
    await registerMutation({
      prefix: e.prefix,
      number: e.number,
      name: e.name,
      department: e.department,
      providerUrl: e.providerUrl,
    });
  };

  const [requestError] = useRequestHandleError({ error });

  const prefixCode = countryCode.map((v, _) => ({
    label: v.NAME,
    value: v.ISD,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-5">
        <div className="grid space-y-2">
          <div>
            <Label htmlFor="number">Number</Label>
            <div className="flex  space-x-1">
              <Input
                type="text"
                name="prefix"
                id="prefix"
                className="w-14 text-center"
                placeholder="1"
                {...register("prefix", {
                  required: "Prefix country is required.",
                })}
              />

              {/* <Select
                name="prefix"
                id="prefix"
                {...register("prefix", {
                  required: "Prefix country is required.",
                })}
                onValueChange={(value) => console.log(value)}
              >
                <SelectTrigger className="text-start">
                  <SelectValue placeholder="Country Code" />
                </SelectTrigger>
                <SelectContent>
                  {prefixCode.map((prefix, idx) => (
                    <div key={idx}>
                      <SelectItem value={prefix.value}>
                        {prefix.label} (+{prefix.value})
                      </SelectItem>
                    </div>
                  ))}
                </SelectContent>
              </Select> */}

              <Input
                type="text"
                name="number"
                id="number"
                placeholder="0123456789"
                {...register("number", {
                  required: "Dialed number is required.",
                })}
              />
            </div>
            <div className="flex gap-1">
              {errors.prefix && (
                <span className="text-xs text-red-500">
                  {errors?.prefix?.message}
                </span>
              )}
              {errors.number && (
                <span className="text-xs text-red-500">
                  {errors?.number?.message}
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
              {...register("name", { required: "Account name is required." })}
            />
            <div className="flex gap-1">
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors?.name?.message}
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
            <Label htmlFor="deparment">Department</Label>
            <Input
              type="text"
              name="department"
              id="department"
              {...register("department", {
                required: "Department name is required.",
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
            <Label htmlFor="providerUrl">Provider</Label>
            <Input
              type="text"
              name="providerUrl"
              id="providerUrl"
              {...register("providerUrl", {
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
          Save
        </Button>
      </div>
    </form>
  );
}
