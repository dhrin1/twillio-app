import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDatesInRange } from "@/lib/helper";
import React from "react";
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const renderLegend = () => {
  const payload = [
    { label: "Pending", value: "pending", color: "#A0A3A9" },
    { label: "Answered", value: "answered", color: "#2AC65A" },
    { label: "Missed", value: "missed", color: "#FF6E65" },
  ];
  return (
    <ul className="inline-flex text-sm gap-x-2">
      {payload.map((entry, index) => (
        <li key={index} className="flex items-center">
          <div className={`size-3 mr-1  bg-[${entry.color}]`}></div>
          {entry.label}
        </li>
      ))}
    </ul>
  );
};

function LineChartComponent({ data }) {
  const payload = [
    { label: "Missed", value: "missed", color: "#FF6E65" },
    { label: "Answered", value: "answered", color: "#A0A3A9" },
    { label: "Completed", value: "pending", color: "#2AC65A" },
  ];
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          //   top: 5,
          right: 10,
          //   left: 20,
          //   bottom: 5,
        }}
      >
        <Legend
          style={{ fontSize: 8 }}
          payload={payload.map((item, index) => ({
            id: item.value,
            type: "square",
            value: `${item.label} `,
            color: item.color,
          }))}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" className="text-xs " />
        <YAxis className="text-xs" />
        <Tooltip />

        {/* <Legend content={renderLegend} /> */}

        <Line
          type="monotone"
          dataKey="missed"
          stroke="#2AC65A"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="answered" stroke="#A0A3A9" />
        <Line type="monotone" dataKey="completed" stroke="#FF6E65" />
      </LineChart>
    </ResponsiveContainer>
  );
}

function BarChartComponent({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart width={150} height={40} data={data}>
        <XAxis dataKey="name" className="text-xs " />
        <YAxis className="text-xs " />
        <Tooltip />
        <Bar dataKey="completed" fill="#2AC65A" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function CallLogsSection(props) {
  const { from, to } = props.onRange;

  const data = getDatesInRange(from, to).map((date) => ({
    name: date,
    missed: Math.floor(Math.random() * 1000) + 1,
    answered: Math.floor(Math.random() * 1000) + 1,
    completed: Math.floor(Math.random() * 1000) + 1,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols gap-5">
          <BarChartComponent data={data} />
          <LineChartComponent data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
