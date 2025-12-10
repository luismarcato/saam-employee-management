import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

const createEmployeeRequest = async (newEmployeeData) => {
  const response = await api.post("/employees", newEmployeeData);

  return response.data;
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployeeRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

