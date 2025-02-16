import React from "react";
import { Button } from "@/components/ui/button";
import { NavLink, useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheck } from "lucide-react";

export default function CheckpointPage() {
  const { data } = useParams();
  return (
    <section className="max-w-xl w-full ">
      <Alert className="mb-5">
        <CircleCheck className="size-4" />
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>{atob(data)}</AlertDescription>
      </Alert>
      <div className="flex flex-col space-y-4">
        <h2 className="text-3xl font-medium">Verify your account</h2>

        <p className="text-gray-500">
          Welcome to korusentaino web application, Before we can get started,
          please confirm your email address
        </p>
        <NavLink to="https://mailtrap.io/inboxes">
          <Button type="button">Confirm Email</Button>
        </NavLink>
      </div>
    </section>
  );
}
