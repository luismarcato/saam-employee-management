package com.saamauditoria.backend.service;

import com.saamauditoria.backend.config.JwtTokenProvider;
import com.saamauditoria.backend.dto.LoginRequestDTO;
import com.saamauditoria.backend.dto.LoginResponseDTO;
import com.saamauditoria.backend.entity.User;
import com.saamauditoria.backend.exception.InvalidCredentialsException;
import com.saamauditoria.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }
    
    public LoginResponseDTO loginUser(LoginRequestDTO requestDTO) {
        User user = userRepository.findByEmail(requestDTO.email())
            .orElseThrow(() -> new InvalidCredentialsException());
        
        if (!passwordEncoder.matches(requestDTO.password(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }
        
        String accessToken = jwtTokenProvider.generateAccessToken(user);
                        
        return new LoginResponseDTO(accessToken); 
    }
}
