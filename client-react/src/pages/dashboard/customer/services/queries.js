import axiosClient from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";

export const useCustomerQuery = () => {
  return useQuery({
    queryFn: () =>
      axiosClient.get("customer/profile").then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        return res?.data?.data?.map((item) => ({
          id: item.customer_id,
          number: item.account_number,
          name: item.name,
          address: item.address,
          createdDate: item.created_at,
          updatedDate: item.updated_at,
        }));
      }),
    queryKey: ["customers"],
    refetchOnWindowFocus: false,
  });
};

export const useGetCustomerQuery = ({ params }) => {
  return useQuery({
    queryFn: () =>
      axiosClient.get(`customer/profile/${params.id}`).then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        const { account_number, name, address } = res.data;
        return {
          number: account_number,
          name,
          address,
        };
      }),
    queryKey: ["customer-details", params.id],
    refetchOnWindowFocus: false,
  });
};
