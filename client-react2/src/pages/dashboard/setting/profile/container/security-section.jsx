import React from "react";
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
import ChangePasswordForm from "./change-password-form";

export default function SecuritySection() {
  return (
    <>
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Used to change to the account authentication password.
          </CardDescription>
        </CardHeader>
        <ChangePasswordForm />
      </Card>
    </>
  );
}
