package com.saamauditoria.backend.dto;

import com.saamauditoria.backend.enums.StatusEmployee;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import java.math.BigDecimal;
import java.time.LocalDate;

public record EmployeeRequestDTO(
    @NotEmpty(message = "O nome é obrigatório")
    String name,
        
    @NotNull(message = "A data de admissão é obrigatória")
    @PastOrPresent(message = "A data de admissão não pode ser futura")
    LocalDate admissionDate,
    
    @NotNull(message = "O salário é obrigatório")
    @DecimalMin(value = "0.0", message = "O salário deve ser maior ou igual a zero")
    BigDecimal salary,
    
    @NotNull(message = "O status é obrigatório")
    StatusEmployee status     
) {}
