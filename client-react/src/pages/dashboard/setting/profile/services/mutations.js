import { useToast } from "@/components/ui/use-toast";
import axiosClient from "@/lib/axios-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfileMutation = ({ params }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, address, designation }) =>
      axiosClient.post(`/auth/user-upstored/${params.id}`, {
        name,
        address,
        designation,
      }),

    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["user-details", newData?.id],
      });
      const previousData = queryClient.getQueryData([
        "user-details",
        newData?.id,
      ]);
      queryClient.setQueryData(["user-details", newData?.id], newData);
      return { previousData, newData };
    },
    onError: (err, newData, context) => {
      toast({
        title: err?.response?.data?.message,
        variant: "destructive",
        description: "There was a problem with your request.",
      });
      queryClient.setQueryData(
        ["user-details", context.newData?.id],
        context.previousData
      );
    },
    onSettled: (newData) => {
      queryClient.invalidateQueries({
        queryKey: ["user-details", newData?.id],
      });
    },

    onSuccess: (response) => {
      if (response.status === 201)
        return toast({
          title: "Success!",
          description: "Account details are being updated.",
        });
    },
  });
};

export const useChangePasswordMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ currentPassword, newPassword, confirmPassword }) =>
      axiosClient.post(`/auth/change-password`, {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      }),

    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["user-details", newData?.id],
      });
      const previousData = queryClient.getQueryData([
        "user-details",
        newData?.id,
      ]);
      queryClient.setQueryData(["user-details", newData?.id], newData);
      return { previousData, newData };
    },
    onError: (err, newData, context) => {
      console.log(err);
    },
    onSettled: (newData) => {},
    onSuccess: (response) => {
      toast({
        title: "Success!",
        description: response.data.message,
      });
      queryClient.invalidateQueries({
        queryKey: ["user-details", newData?.id],
      });
    },
  });
};
