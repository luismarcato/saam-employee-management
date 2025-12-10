import { useMutation } from "@tanstack/react-query";
import api from "../services/api";

const loginRequest = async (data) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
  });
};

