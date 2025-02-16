import axiosClient from "@/lib/axios-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

export const useUpdateCustomerDetailsMutation = ({ params, onClose }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, address }) =>
      axiosClient.put(`customer/profile/${params.id}`, {
        name,
        address,
      }),

    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["customers", newData?.id],
      });
      const previousData = queryClient.getQueryData(["customers", newData?.id]);
      queryClient.setQueryData(["customers", newData?.id], newData);
      return { previousData, newData };
    },
    onError: (err, newData, context) => {
      toast({
        title: err?.response?.data?.message,
        variant: "destructive",
        description: "There was a problem with your request.",
      });
      queryClient.setQueryData(
        ["customers", context.newData?.id],
        context.previousData
      );
    },
    onSettled: (newData) => {
      queryClient.invalidateQueries({
        queryKey: ["customers", newData?.id],
      });
    },
    onSuccess: (response) => {
      if (response.status === 201) return onClose();
    },
  });
};

export const useDeleteCustomerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) =>
      axiosClient.delete(`/customer/profile/${id}`, { status: 0 }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["customers", newData?.id],
      });
      const previousData = queryClient.getQueryData(["customers", newData.id]);
      queryClient.setQueryData(["customers", newData?.id], newData);
      return { previousData, newData };
    },
    onError: (err, newData, context) => {
      toast({
        title: err?.response?.data?.message,
        variant: "destructive",
        description: "There was a problem with your request.",
      });
      queryClient.setQueryData(
        ["customers", context.newData?.id],
        context.previousData
      );
    },
    onSettled: (newData) => {
      queryClient.invalidateQueries({
        queryKey: ["customers", newData?.id],
      });
    },
  });
};
