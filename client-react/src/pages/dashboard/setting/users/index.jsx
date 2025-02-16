import React from "react";
import { useUserListQuery } from "./services/queries";
import DataTableUsers from "./container/users-data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsUsersPage() {
  const { data, isPending } = useUserListQuery();
  return (
    <>
      {/* <section className="bg-white h-20 w-full p-3 ">
        <div className="size-full flex flex-col ">
          <h2 className="text-gray-800">Users</h2>
        </div>
      </section> */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <section>
        <DataTableUsers data={data || []} isLoading={isPending} />
      </section>
    </>
  );
}
