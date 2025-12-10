import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "../schemas/employeeSchema";
import { NumericFormat, PatternFormat } from "react-number-format";
import { useCreateEmployee } from "../hooks/useCreateEmployee";
import { useToast } from "../context/ToastContext";
import { useUpdateEmployee } from "../hooks/useUpdateEmployee";
import { formatDateToBR } from "../utils/formatUtils";

export default function EmployeeFormModal({ open, onClose, employeeToEdit }) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: employeeToEdit
      ? {
          name: employeeToEdit.name,
          admissionDate: formatDateToBR(employeeToEdit.admissionDate),
          salary: employeeToEdit.salary.toString(),
          status: employeeToEdit.status,
        }
      : {
          name: "",
          admissionDate: "",
          salary: "",
          status: "",
        },
    resolver: zodResolver(employeeSchema),
  });

  const { showToast } = useToast();
  const { mutate: createEmployeeMutate } = useCreateEmployee();
  const { mutate: updateEmployeeMutate } = useUpdateEmployee();

  const onSubmit = (data) => {
    if (!employeeToEdit) {
      createEmployeeMutate(data, {
        onSuccess: () => {
          showToast("Funcionário registrado com sucesso", "success");
          reset();
          onClose();
        },
        onError: (error) => {
          showToast(
            error.response?.data?.message ?? "Falha ao registrar funcionário",
            "error"
          );
        },
      });
    } else {
      if (!employeeToEdit.id) return;

      updateEmployeeMutate(
        { id: employeeToEdit.id, data },
        {
          onSuccess: () => {
            showToast("Funcionário atualizado com sucesso", "success");
            reset();
            onClose();
          },
          onError: (error) => {
            showToast(
              error.response?.data?.message ?? "Falha ao atualizar funcionário",
              "error"
            );
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle textAlign={"center"} fontWeight={"bold"} sx={{ pt: 3 }}>
        {employeeToEdit ? "Editar Funcionário" : "Adicionar Funcionário"}
      </DialogTitle>

      <DialogContent dividers sx={{ px: 6, border: "none" }}>
        <form id="create-employee-form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <Controller
            name="admissionDate"
            control={control}
            render={({ field, fieldState }) => (
              <PatternFormat
                customInput={TextField}
                format="##/##/####"
                mask="_"
                label="Data de admissão"
                fullWidth
                margin="normal"
                value={field.value}
                onValueChange={(v) => field.onChange(v.formattedValue)}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="salary"
            control={control}
            render={({ field, fieldState }) => (
              <NumericFormat
                customInput={TextField}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                label="Salário"
                fullWidth
                margin="normal"
                value={field.value}
                onValueChange={(v) => field.onChange(v.value)}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                select
                label="Status"
                fullWidth
                margin="normal"
                variant="outlined"
                value={field.value}
                onChange={field.onChange}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                <MenuItem value="ATIVO">ATIVO</MenuItem>
                <MenuItem value="INATIVO">INATIVO</MenuItem>
              </TextField>
            )}
          />
        </form>
      </DialogContent>

      <DialogActions sx={{ py: 4, justifyContent: "center" }}>
        <Button onClick={onClose}>Cancelar</Button>

        <Button
          type="submit"
          form="create-employee-form"
          variant="contained"
          size="large"
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

