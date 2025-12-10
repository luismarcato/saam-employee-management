import z from "zod";

export const employeeSchema = z.object({
  name: z.string().min(1, "Informar nome é obrigatório"),
  admissionDate: z
    .string()
    .min(1, "Informar data de admissão é obrigatório")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/YYYY")
    .refine((val) => {
      const [day, month, year] = val.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    }, "Digite uma data válida")
    .refine((val) => {
      const [day, month, year] = val.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      const today = new Date();
      return date <= today;
    }, "Data não pode estar no futuro")
    .transform((val) => {
      const [day, month, year] = val.split("/");
      return `${year}-${month}-${day}`;
    }),
  salary: z.string().min(1, "Informar salário é obrigatório"),
  status: z.enum(["ATIVO", "INATIVO"], "Status inválido"),
});

