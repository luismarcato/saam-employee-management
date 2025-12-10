import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

const deleteEmployeeRequest = async (employeeId) => {
  await api.delete(`/employees/${employeeId}`);

  return employeeId;
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployeeRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

