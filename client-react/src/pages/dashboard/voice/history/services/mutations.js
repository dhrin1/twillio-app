import { useToast } from "@/components/ui/use-toast";
import axiosClient from "@/lib/axios-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveCallHistoryMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ id }) =>
      axiosClient.put(`event/notification/${id}`, { status: 0 }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["call-history", newData.id],
      });
      const previousData = queryClient.getQueryData([
        "call-history",
        newData.id,
      ]);
      queryClient.setQueryData(["call-history", newData?.id], newData);
      return { previousData, newData };
    },
    onError: (err, newData, context) => {
      toast({
        title: err.response.data.message,
        description: "There was a problem with your request.",
        variant: "destructive",
      });
      queryClient.setQueryData(
        ["call-history", context.newData?.id],
        context.previousData
      );
    },
    onSettled: (newData) => {
      queryClient.invalidateQueries({
        queryKey: ["call-history", newData?.id],
      });
    },
  });
};
