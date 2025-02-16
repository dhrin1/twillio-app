import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRequestHandleError from "@/hooks/useRequestHandleError";
import axiosClient from "@/lib/axios-client";
import { useMutation } from "@tanstack/react-query";
import { PhoneCall } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { AccountDropdown } from "./container/account-dropdown";

export default function TestVoicePage() {
  const {
    isPending,
    isError,
    error,
    mutateAsync: registerMutation,
  } = useMutation({
    mutationFn: ({ from, to }) =>
      axiosClient.post("/event/test-notification", {
        base_account_number: from,
        customer_account_number: to,
      }),
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {},
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (e) => {
    await registerMutation({
      from: e.from,
      to: e.to,
    });
  };

  const [requestError] = useRequestHandleError({ error });

  return (
    <main className="h-[80vh] flex justify-center  items-center">
      <div className="max-w-md w-full bg-white p-8">
        <h2 className="mb-3 text-lg font-medium">Test voice call</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid space-y-3">
          <div>
            <Label htmlFor="from">From</Label>
            <Input
              type="text"
              name="to"
              id="to"
              className="w-full"
              {...register("to", {
                required: "Customer number is required.",
              })}
              placeholder="Customer Number"
            />
            {errors.to && (
              <span className="text-xs text-red-500">
                {errors?.to?.message}
              </span>
            )}
            {isError && (
              <span className="text-xs text-red-500">
                {requestError?.customer_account_number}
              </span>
            )}
          </div>
          <div>
            <Label>To</Label>
            <Input
              type="text"
              name="from"
              id="from"
              className="w-full"
              {...register("from", {
                required: "Account number is required.",
              })}
              placeholder="Account Number"
            />

            {errors.from && (
              <span className="text-xs text-red-500">
                {errors?.from?.message}
              </span>
            )}
            {isError && (
              <span className="text-xs text-red-500">
                {requestError?.base_account_number}
              </span>
            )}
          </div>
          <div>
            <Button type="submit" disabled={isPending} className="w-full">
              <PhoneCall size={24} />
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
