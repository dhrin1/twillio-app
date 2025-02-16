import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import ActiveDatable from "./container/active-data-table";

export default function VoiceActivePage() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Active Calls</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <ActiveDatable data={[]} isLoading={false} />
    </>
  );
}
