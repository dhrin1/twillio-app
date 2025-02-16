import axiosClient from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";

export const useNotificationEvent = () => {
  return useQuery({
    queryFn: async () =>
      await axiosClient.get("/event/notification").then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        return res?.data;
      }),
    queryKey: ["notification-event"],
  });
};

export const useCounterCard = () => {
  return useQuery({
    queryFn: async () =>
      await axiosClient.get("/analytics/get-counter-card").then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }

        if (Object.keys(res.data).length > 0) {
          const { base_account, customer, message, user, voice } = res.data;
          return {
            baseAccount: {
              count: base_account?.count ?? 0,
              aveIncrease: base_account?.percent_increase.toFixed(1) ?? 0,
            },
            customer: {
              count: customer?.count,
              aveIncrease: customer?.percent_increase.toFixed(1) ?? 0,
            },
            user: {
              count: user?.count,
              aveIncrease: user?.percent_increase.toFixed(1) ?? 0,
            },
            voice: {
              count: voice?.count,
              numIncrease: voice?.number_increase ?? 0,
            },
            message: {
              count: message?.count,
              numIncrease: message?.number_increase ?? 0,
            },
          };
        }
      }),
    queryKey: ["counter-card"],
  });
};
