import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

const fetchEmployees = async () => {
  const response = await api.get("/employees");

  return response.data;
};

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    staleTime: 5 * 60 * 1000,
  });
};

