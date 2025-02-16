import { useToast } from "@/components/ui/use-toast";
import axiosClient from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";

export const useGetUserQuery = () => {
  const { toast } = useToast();
  try {
    return useQuery({
      queryFn: async () =>
        await axiosClient.get("/auth/user").then((res) => {
          if (res.status !== 200) {
            throw new Error("Failed to fetch");
          }
          return res;
        }),
      queryKey: ["user-details"],
      onError: (err) => {
        toast({
          title: err?.response?.data?.message,
          variant: "destructive",
          description: "There was a problem with your request.",
        });
      },
    });
  } catch (error) {
    return error;
  }
};
