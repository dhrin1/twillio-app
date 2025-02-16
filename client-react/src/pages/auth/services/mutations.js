import axiosClient from "@/lib/axios-client";
import { useStateContext } from "@/providers/AppContextProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignUpMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ name, email, password, confirmPassword }) =>
      axiosClient.post("/auth/register", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      }),
    onSuccess: (obj) => {
      const { status, data } = obj;
      if (status === 201 && data.status === "success")
        navigate(`/auth/checkpoint/${btoa(data.message)}`);
    },
  });
};

export const useLoginMutation = () => {
  const { user, setUser } = useStateContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }) =>
      axiosClient.post("/auth/login", { email, password }),
    onSuccess: ({ status, data }) => {
      if (status == 200)
        setUser({
          ...user,
          currentUser: data?.user,
          initToken: data?.access_token,
        });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries(["user-details"]);
    },
  });
};

export const useLogoutMutation = () => {
  const { user, setUser, setToken } = useStateContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => axiosClient.post("/auth/logout"),
    onSuccess: () => {
      setUser({
        ...user,
        currentUser: {},
        initToken: null,
        isAuthenticated: false,
      });
      setToken(null);
      queryClient.invalidateQueries(["user-details"]);
    },
  });
};
