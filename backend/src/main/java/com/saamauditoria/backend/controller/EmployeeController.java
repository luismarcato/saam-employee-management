package com.saamauditoria.backend.controller;

import com.saamauditoria.backend.dto.EmployeeRequestDTO;
import com.saamauditoria.backend.dto.EmployeeResponseDTO;
import com.saamauditoria.backend.service.EmployeeService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {
    
    private final EmployeeService employeeService;
    
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
    
    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> create(@Valid @RequestBody EmployeeRequestDTO requestDTO) {
        EmployeeResponseDTO newEmployee = employeeService.createEmployee(requestDTO);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(newEmployee);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> findById(@PathVariable Long id) {
        EmployeeResponseDTO employee = employeeService.findEmployeeById(id);
        
        return ResponseEntity.ok().body(employee);
    }
    
    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> findAll() {
        List<EmployeeResponseDTO> employees = employeeService.findAllEmployees();
        
        return ResponseEntity.ok().body(employees);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> update(@PathVariable Long id,@Valid @RequestBody EmployeeRequestDTO requestDTO) {
        EmployeeResponseDTO updatedEmployee = employeeService.updateEmployee(id, requestDTO);
        
        return ResponseEntity.ok().body(updatedEmployee);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        
        return ResponseEntity.noContent().build();
    }
}
