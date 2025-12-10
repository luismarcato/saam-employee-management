package com.saamauditoria.backend.service;

import com.saamauditoria.backend.dto.EmployeeRequestDTO;
import com.saamauditoria.backend.dto.EmployeeResponseDTO;
import com.saamauditoria.backend.entity.Employee;
import com.saamauditoria.backend.exception.EmployeeNotFoundException;
import com.saamauditoria.backend.mapper.EmployeeMapper;
import com.saamauditoria.backend.repository.EmployeeRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeService {
    
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    
    public EmployeeService(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper) {
        this.employeeRepository = employeeRepository;        
        this.employeeMapper = employeeMapper;
    }
    
    @Transactional
    public EmployeeResponseDTO createEmployee(EmployeeRequestDTO requestDTO) {
        Employee newEmployee = employeeMapper.toEntity(requestDTO);
        
        return employeeMapper.toResponse(employeeRepository.save(newEmployee));
    }
    
    @Transactional(readOnly = true)
    public EmployeeResponseDTO findEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new EmployeeNotFoundException());
        
        return employeeMapper.toResponse(employee);
    }
    
    @Transactional(readOnly = true)
    public List<EmployeeResponseDTO> findAllEmployees() {
        return employeeRepository.findAll()
            .stream()
            .map(employeeMapper::toResponse)
            .toList();
    }
    
    @Transactional
    public EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO requestDTO) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new EmployeeNotFoundException());
        
        employeeMapper.updateEntityFromDTO(requestDTO, employee);
        
        return employeeMapper.toResponse(employeeRepository.save(employee));
    }
    
    @Transactional
    public void deleteEmployee(Long id) {
        if(!employeeRepository.existsById(id)) {
            throw new EmployeeNotFoundException();
        }
        
        employeeRepository.deleteById(id);
    }
}
