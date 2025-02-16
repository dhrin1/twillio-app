import * as React from "react";
import CallLogsSection from "./container/call-logs-section";
import CounterCardSection from "./container/counter-card-section";
import DatePickerWithRange from "./container/date-range-picker";
import InboundVoiceRadar from "./container/inbound-voice-radar";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [initDate, setInitDate] = React.useState({
    from: startOfMonth,
    to: endOfMonth,
  });

  const [date, setDate] = React.useState(initDate);
  const onSelectDate = () => {
    setDate(initDate);
  };

  return (
    <>
      <CounterCardSection />
      <div className="flex justify-between items-center">
        <div className="flex justify-start space-x-2">
          <DatePickerWithRange date={initDate} onSelect={setInitDate} />
          <Button onClick={onSelectDate}>Filter</Button>
        </div>
      </div>
      <div className="grid gap-4 md:gap-8 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-12">
        <div className="col-span-8">
          <CallLogsSection onRange={date} />
        </div>
        <div className="col-span-4">
          <InboundVoiceRadar />
        </div>
      </div>
    </>
  );
}
