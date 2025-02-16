import React from "react";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  MessagesSquare,
  Package2,
  Phone,
  PhoneIncoming,
  Search,
  SquareUserRound,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCounterCard } from "../services/queries";

export default function CounterCardSection() {
  const { data, isPending } = useCounterCard();

  return (
    <div className="grid gap-4 grid-cols-2  md:grid-cols-3 md:gap-8 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Account Number</CardTitle>
          <Phone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isPending ? 0 : data?.baseAccount?.count}
          </div>
          <p className="text-xs text-muted-foreground">
            +{data?.baseAccount?.aveIncrease}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Customers</CardTitle>
          <SquareUserRound className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isPending ? 0 : data?.customer?.count}
          </div>
          <p className="text-xs text-muted-foreground">
            +{data?.customer?.aveIncrease}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Voice</CardTitle>
          <PhoneIncoming className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isPending ? 0 : data?.voice.count}
          </div>
          <p className="text-xs text-muted-foreground">
            +{data?.voice.numIncrease} since last hour
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Messages</CardTitle>
          <MessagesSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isPending ? 0 : data?.message.count}
          </div>
          <p className="text-xs text-muted-foreground">
            +{data?.message.numIncrease} since last hour
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isPending ? 0 : data?.user?.count}
          </div>
          <p className="text-xs text-muted-foreground">
            +{data?.user?.aveIncrease}% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
