import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useDeleteEmployee } from "../hooks/useDeleteEmployee";
import { useToast } from "../context/ToastContext";

export default function ConfirmDeleteEmployee({ open, onClose, employee }) {
  const { mutate } = useDeleteEmployee();
  const { showToast } = useToast();

  const onConfirm = () => {
    if (!employee?.id) return;

    mutate(employee.id, {
      onSuccess: () => {
        showToast("Funcionário deletado com sucesso", "success");
        onClose();
      },
      onError: (error) => {
        showToast(
          error.response?.data?.message ?? "Falha ao deletar funcionário",
          "error"
        );
      },
    });
  };

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ pt: 3, fontWeight: "bold" }}>
        Confirmar Exclusão
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir o funcionário{" "}
          <strong>{employee?.name}</strong>?
          <br />
          Essa ação não poderá ser desfeita!
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>Cancelar</Button>

        <Button onClick={onConfirm} color="error" variant="contained">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}

