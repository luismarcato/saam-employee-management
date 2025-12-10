import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

const updateEmployeeRequest = async ({ id, data }) => {
  const response = await api.put(`/employees/${id}`, data);

  return response.data;
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployeeRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

