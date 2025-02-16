import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useGetUserQuery } from "@/pages/auth/services/queries";
import { useUpdateProfileMutation } from "../services/mutations";
import Loader from "@/components/shared/loader-spinner";
import useRequestHandleError from "@/hooks/useRequestHandleError";

export default function AccountSection() {
  const { data: userResponse, isPending: onUserLoad } = useGetUserQuery();

  const {
    mutateAsync: registerMutation,
    isPending: onUpdateLoad,
    isError,
    error,
  } = useUpdateProfileMutation({
    params: { id: userResponse?.data?.id },
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
    const { name, email, address, designation } = e.details;
    await registerMutation({
      name,
      email,
      designation,
      address,
    });
  };

  useEffect(() => {
    if (!onUserLoad) {
      const { name, email, designation, address } = userResponse?.data;
      setValue("details", {
        name,
        email,
        designation,
        address,
      });
    }
  }, [onUserLoad]);

  const [requestError] = useRequestHandleError({ error });

  return (
    <>
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle>Information</CardTitle>
          <CardDescription>
            Update your account's profile information.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-3">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                {...register("details.name", {
                  required: "Name is required.",
                })}
              />
              <div className="flex space-x-3">
                {errors?.details?.name && (
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
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                {...register("details.email", {
                  required: "Email is required.",
                })}
                readOnly={true}
              />
              <div className="flex space-x-3">
                {errors?.details?.email && (
                  <span className="text-xs text-red-500">
                    {errors?.email?.message}
                  </span>
                )}
                {isError && (
                  <span className="text-xs text-red-500">
                    {requestError?.email}
                  </span>
                )}
              </div>
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
                readOnly={true}
              />
              <div className="flex space-x-3">
                {errors?.details?.designation && (
                  <span className="text-xs text-red-500">
                    {errors?.details?.designation?.message}
                  </span>
                )}
                {isError && (
                  <span className="text-xs text-red-500">
                    {requestError?.designation}
                  </span>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                name="address"
                id="address"
                {...register("details.address", {
                  required: "Address is required.",
                })}
              />
              {errors?.details?.address && (
                <span className="text-xs text-red-500">
                  {errors?.designation?.message}
                </span>
              )}
              {isError && (
                <span className="text-xs text-red-500">
                  {requestError?.address}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={onUpdateLoad}>
              <Loader isPending={onUpdateLoad} className="size-4" />
              Save
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
