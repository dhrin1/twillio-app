import axiosClient from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";

export const useUserListQuery = () => {
  return useQuery({
    queryFn: () =>
      axiosClient.get("/auth/get-users").then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        return res.data.data.map((item) => ({
          id: item.id,
          fullName: item.name,
          email: item.email,
          designation: item.designation,
          createdDate: item.created_at,
          address: item.address,
          role: item.role,
          remarks: item.status,
          status: item.status,
          verifiedDate: item.verified_date,
        }));
      }),
    queryKey: ["user-list"],
    refetchOnWindowFocus: false,
  });
};

export const useGetUserQuery = ({ params }) => {
  const id = params.id;
  return useQuery({
    queryKey: ["user-list", id],
    queryFn: () =>
      axiosClient.get(`auth/get-users?id=${id}`).then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        const {
          id,
          name,
          email,
          designation,
          created_at,
          address,
          role,
          status,
        } = res?.data?.data[0];
        return {
          id,
          fullName: name,
          email,
          designation,
          createdDate: created_at,
          address,
          role,
          remarks: status,
          status,
        };
      }),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};
