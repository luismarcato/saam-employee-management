import { useMemo, useState } from "react";

import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Paper,
  TablePagination,
  CircularProgress,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEmployees } from "../hooks/useEmployees";
import ConfirmDeleteEmployee from "../components/ConfirmDeleteEmployee";
import EmployeeFormModal from "../components/EmployeeFormModal";
import { formatCurrencyBR, formatDateToBR } from "../utils/formatUtils";

export default function DashboardPage() {
  const { data: employees = [], isLoading } = useEmployees();

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    employeeData: null,
  });

  const [searchFilter, setSearchFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null, employeeData: null });
  };

  const handleOpenAdd = () => {
    setModalState({ isOpen: true, type: "add", employeeData: null });
  };

  const handleOpenEdit = (employee) => {
    setModalState({ isOpen: true, type: "edit", employeeData: employee });
  };

  const handleOpenDelete = (employee) => {
    setModalState({ isOpen: true, type: "delete", employeeData: employee });
  };

  const filteredEmployees = useMemo(() => {
    if (isLoading || !employees) return [];
    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [employees, searchFilter]);

  const totalEmployees = filteredEmployees.length ?? 0;
  const totalActive =
    filteredEmployees.filter((e) => e.status === "ATIVO").length ?? 0;
  const totalInactive =
    filteredEmployees.filter((e) => e.status === "INATIVO").length ?? 0;

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderModal = () => {
    if (!modalState.isOpen) return null;

    const { type, employeeData } = modalState;

    if (type === "add" || type === "edit") {
      return (
        <EmployeeFormModal
          open={modalState.isOpen}
          onClose={handleCloseModal}
          employeeToEdit={type === "edit" ? employeeData : null}
        />
      );
    }

    if (type === "delete" && employeeData) {
      return (
        <ConfirmDeleteEmployee
          open={modalState.isOpen}
          onClose={handleCloseModal}
          employee={employeeData}
        />
      );
    }

    return null;
  };

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );

  return (
    <>
      <Box maxWidth="1200px" mx="auto" px={2}>
        <Box display="flex" gap={3} mb={4}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <PeopleIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="body2">Total de Funcionários</Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {totalEmployees}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <PersonIcon color="success" fontSize="large" />
                <Box>
                  <Typography variant="body2">Ativos</Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {totalActive}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <PersonOffIcon color="inactive" fontSize="large" />
                <Box>
                  <Typography variant="body2">Inativos</Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {totalInactive}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Paper
          sx={{
            px: 4,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
          elevation={2}
        >
          <TextField
            variant="outlined"
            placeholder="Buscar pelo nome do funcionário"
            sx={{ width: "380px" }}
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ mr: 1 }}>
                    <SearchIcon color="inactive" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button variant="contained" size="large" onClick={handleOpenAdd}>
            Novo Funcionário
          </Button>
        </Paper>

        <Paper sx={{ overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <strong>#</strong>
                </TableCell>
                <TableCell>
                  <strong>Nome</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Data de Admissão</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Salário</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Status</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Ações</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredEmployees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell align="center">
                      {formatDateToBR(employee.admissionDate)}
                    </TableCell>
                    <TableCell align="center">
                      {formatCurrencyBR(employee.salary)}
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={employee.status}
                        color={
                          employee.status === "ATIVO" ? "success" : "inactive"
                        }
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="warning"
                        onClick={() => handleOpenEdit(employee)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => handleOpenDelete(employee)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

              {filteredEmployees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Ainda não há nenhum funcionário adicionado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Box display="flex" justifyContent="center" sx={{ py: 1 }}>
            <TablePagination
              component="div"
              count={filteredEmployees.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage="Linhas por página"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
              }
            />
          </Box>
        </Paper>
      </Box>

      {renderModal()}
    </>
  );
}

