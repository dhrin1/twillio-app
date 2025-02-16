import React from "react";
import CustomerDataTable from "../container/customers-data-table";
import { useCustomerQuery } from "../services/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerHomePage() {
  const { data, isPending } = useCustomerQuery();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Customer</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <section>
        <CustomerDataTable data={data || []} isLoading={isPending} />
      </section>
    </>
  );
}
