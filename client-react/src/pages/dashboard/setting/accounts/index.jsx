import React from "react";
import DataTableAccount from "./container/account-data-table";
import { useBaseAccountQuery } from "./services/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsAccountsPage() {
  const { data, isLoading } = useBaseAccountQuery();

  // const variables = useMutationState({
  //   filters: { mutationKey: ["add-base-account"], status: "pending" },
  //   select: (mutation) => mutation.state.variables,
  // });

  // console.log(data, variables);

  // const data = React.useMemo(() => {
  //   return Array.isArray(theData) ? theData : [];
  // }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Accounts</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <section>
        <DataTableAccount data={data || []} isLoading={isLoading} />
      </section>
    </>
  );
}
