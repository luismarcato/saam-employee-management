package com.saamauditoria.backend.mapper;

import com.saamauditoria.backend.dto.EmployeeRequestDTO;
import com.saamauditoria.backend.dto.EmployeeResponseDTO;
import com.saamauditoria.backend.entity.Employee;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {
    
    public Employee toEntity(EmployeeRequestDTO requestDTO) {
        Employee employee = new Employee();
        
        employee.setName(requestDTO.name());
        employee.setAdmissionDate(requestDTO.admissionDate());
        employee.setSalary(requestDTO.salary());
        employee.setStatus(requestDTO.status());
        
        return employee;
    }
    
    public EmployeeResponseDTO toResponse(Employee employee) {
        return new EmployeeResponseDTO(
            employee.getId(),
            employee.getName(),
            employee.getAdmissionDate(),
            employee.getSalary(),
            employee.getStatus()
        );
    }
    
    public void updateEntityFromDTO(EmployeeRequestDTO requestDTO, Employee employee) {
        employee.setName(requestDTO.name());
        employee.setAdmissionDate(requestDTO.admissionDate());
        employee.setSalary(requestDTO.salary());
        employee.setStatus(requestDTO.status());
    }
}
