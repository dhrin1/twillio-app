import { useToast } from "@/components/ui/use-toast";
import axiosClient from "@/lib/axios-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserMutation = ({ params, onClose }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ name, designation, address }) =>
      axiosClient.post(`/auth/user-upstored/${params.id}`, {
        name,
        designation,
        address,
      }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["user-list", newData?.id] });
      const previousTodo = queryClient.getQueryData(["user-list", newData?.id]);
      queryClient.setQueryData(["user-list", newData.id], newData);
      return { previousTodo, newData };
    },
    onError: (err, newData, context) => {
      toast({
        title: err?.response?.data?.message,
        variant: "destructive",
        description: "There was a problem with your request.",
      });
      queryClient.setQueryData(
        ["user-list", context.newData?.id],
        context.previousTodo
      );
    },
    onSettled: (newData) => {
      queryClient.invalidateQueries({ queryKey: ["user-list", newData?.id] });
    },
    onSuccess: (response) => {
      if (response.status === 201) return onClose();
    },
  });
};

export const useDeteUserMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ id }) => axiosClient.delete(`/auth/remove-user/${id}`),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["user-list", newData.id],
      });
      const previousData = queryClient.getQueryData(["user-list", newData?.id]);
      queryClient.setQueryData(["user-list", newData?.id], newData);
      return { previousData, newData };
    },
    onError: (err, newData, context) => {
      toast({
        title: err?.response?.data?.message,
        variant: "destructive",
        description: "There was a problem with your request.",
      });
      queryClient.setQueryData(
        ["user-list", context.newData?.id],
        context.previousData
      );
    },
    onSettled: (newData) => {
      queryClient.invalidateQueries({
        queryKey: ["user-list", newData?.id],
      });
    },
  });
};

export const useAuthorizedUserMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id }) => axiosClient.put(`/auth/blocked-user/${id}`),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["user-list", newData.id],
      });
      const previousData = queryClient.getQueryData(["user-list", newData.id]);
      queryClient.setQueryData(["user-list", newData.id], newData);
      return { previousData, newData };
    },
    onError: (err, newData, context) => {
      toast({
        title: err?.response?.data?.message,
        variant: "destructive",
        description: "There was a problem with your request.",
      });
      queryClient.setQueryData(
        ["user-list", context.newData?.id],
        context.previousData
      );
    },
    onSettled: (newData) => {
      queryClient.invalidateQueries({
        queryKey: ["user-list", newData?.id],
      });
    },
  });
};

export const useConfirmEmailMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ email }) =>
      axiosClient.post(`auth/confirm-email-user`, { email }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["user-list"] });
      const previousData = queryClient.getQueryData(["user-list"]);
      // queryClient.setQueryData(["user-list"], (prev) => [...prev, newData]);
      return { previousData };
    },
    onError: (err, newData, context) => {
      toast({
        title: err?.response?.data?.message,
        variant: "destructive",
        description: "There was a problem with your request.",
      });
      queryClient.setQueryData(["user-list"], context.previousData);
    },
    onSuccess: (response) => {
      if (response.status == 200) {
        const { message, status } = response.data;
        toast({
          title: "Success",
          description: message,
        });
        queryClient.invalidateQueries({ queryKey: ["user-list"] });
      }
    },
    mutationKey: ["confirm-email"],
  });
};
