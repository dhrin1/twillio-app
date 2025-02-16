import { toast } from "@/components/ui/use-toast";
import axiosClient from "@/lib/axios-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAcceptCallsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) =>
      axiosClient.put(`event/notification/${id}`, { active: 0, remarks: "A" }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["notification-event", newData?.id],
      });
      const previousData = queryClient.getQueryData([
        "notification-event",
        newData?.id,
      ]);
      queryClient.setQueryData(["notification-event", newData?.id], newData);
      return { previousData, newData };
    },
    onError: (err, newData, context) => {
      toast({
        title: err?.response?.data?.message,
        variant: "destructive",
        description: "There was a problem with your request.",
      });
      queryClient.setQueryData(
        ["notification-event", context.newData?.id],
        context.previousData
      );
    },
    onSettled: (newData) => {
      queryClient.invalidateQueries({
        queryKey: ["notification-event", newData?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["call-history", newData?.id],
      });
    },
  });
};
