import axiosClient from "@/lib/axios-client";
import { voiceRemark } from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";

export const useVoiceHistoryQuery = () => {
  return useQuery({
    queryFn: () =>
      axiosClient.get(`event/notification?event=voices`).then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        return res?.data?.data?.map((item) => ({
          id: item.id,
          event: item.event,
          direction: item.direction,
          number: item.base_account.account_number,
          customerNumber: item.customer_account.account_number,
          createdDate: item.created_at,
          remarks: voiceRemark.get(item.remarks),
        }));
      }),
    queryKey: ["call-history"],
    refetchOnWindowFocus: false,
  });
};
