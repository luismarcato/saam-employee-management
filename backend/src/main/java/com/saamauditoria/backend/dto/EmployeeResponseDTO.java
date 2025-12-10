package com.saamauditoria.backend.dto;

import com.saamauditoria.backend.enums.StatusEmployee;
import java.math.BigDecimal;
import java.time.LocalDate;

public record EmployeeResponseDTO(
    Long id,
    String name,
    LocalDate admissionDate,
    BigDecimal salary,
    StatusEmployee status
) {}
