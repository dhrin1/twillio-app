import React from "react";
import CallsDataTable from "./container/calls-data-table";
import { useVoiceHistoryQuery } from "./services/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VoiceHistoryPage() {
  const { data, isPending } = useVoiceHistoryQuery();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Call History</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <section>
        <CallsDataTable data={data || []} isLoading={isPending} />
      </section>
    </>
  );
}
