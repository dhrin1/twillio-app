import { useToast } from "@/components/ui/use-toast";
import axiosClient from "@/lib/axios-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAccountDeleteMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ id }) => axiosClient.delete(`/base-account/${id}`),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["base-accounts", newData?.id],
      });
      const previousData = queryClient.getQueryData([
        "base-accounts",
        newData.id,
      ]);
      queryClient.setQueryData(["base-accounts", newData?.id], newData);
      return { previousData, newData };
    },
    onError: (err, newData, context) => {
      toast({
        title: err?.response?.data?.message,
        variant: "destructive",
        description: "There was a problem with your request.",
      });
      queryClient.setQueryData(
        ["base-accounts", context.newData?.id],
        context.previousData
      );
    },
    onSettled: (newData) => {
      queryClient.invalidateQueries({
        queryKey: ["base-accounts", newData?.id],
      });
    },
  });
};

export const useCreateAccountMutation = ({ onClose }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ prefix, number, name, department, providerUrl }) =>
      axiosClient.post("/base-account", {
        prefix,
        account_number: number,
        name,
        department,
        provider_url: providerUrl,
      }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["base-accounts"] });
      const previousData = queryClient.getQueryData(["base-accounts"]);
      queryClient.setQueryData(["base-accounts"], (prev) => [...prev, newData]);
      return { previousData };
    },
    onError: (err, newData, context) => {
      toast({
        title: err?.response?.data?.message,
        variant: "destructive",
        description: "There was a problem with your request.",
      });
      queryClient.setQueryData(["base-accounts"], context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["base-accounts"] });
    },
    mutationKey: ["add-base-account"],
    onSuccess: (res) => {
      if (res.status === 201) onClose();
    },
  });
};

export const useUpdateAccountMutation = ({ params, onClose }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ prefix, number, name, department, providerUrl }) =>
      axiosClient.put(`/base-account/${params.id}`, {
        prefix,
        account_number: number,
        name,
        department,
        provider_url: providerUrl,
      }),

    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["base-accounts", newData?.id],
      });
      const previousData = queryClient.getQueryData([
        "base-accounts",
        newData?.id,
      ]);
      queryClient.setQueryData(["base-accounts", newData?.id], newData);
      return { previousData, newData };
    },
    onError: (err, newData, context) => {
      toast({
        title: err?.response?.data?.message,
        variant: "destructive",
        description: "There was a problem with your request.",
      });
      queryClient.setQueryData(
        ["base-accounts", context.newData?.id],
        context.previousData
      );
    },
    onSettled: (newData) => {
      queryClient.invalidateQueries({
        queryKey: ["base-accounts", newData?.id],
      });
    },

    onSuccess: (response) => {
      if (response.status === 201) return onClose();
    },
  });
};
