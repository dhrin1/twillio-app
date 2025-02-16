import axiosClient from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";

export const useBaseAccountQuery = () => {
  return useQuery({
    queryFn: () =>
      axiosClient.get("/base-account").then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        return res?.data?.data?.map((item) => ({
          id: item.id,
          number: "+" + item.account_number,
          name: item.name,
          prefix: item.prefix,
          department: item.department,
          provider: item.provider_url,
          created: item.created_at,
        }));
      }),
    queryKey: ["base-accounts"],
    refetchOnWindowFocus: false,
  });
};

export const useBaseSingleAccountQuery = ({ params }) => {
  return useQuery({
    queryFn: () =>
      axiosClient.get(`/base-account/${params.id}`).then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        const {
          account_number,
          phone_number,
          created_at,
          department,
          name,
          prefix,
          provider_url,
        } = res.data;
        return {
          number: phone_number,
          created: created_at,
          department,
          name,
          prefix: prefix,
          provider: provider_url,
        };
      }),
    queryKey: ["base-accounts-details"],
    refetchOnWindowFocus: false,
  });
};
