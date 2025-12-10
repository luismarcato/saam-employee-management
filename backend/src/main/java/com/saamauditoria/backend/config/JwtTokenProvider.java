package com.saamauditoria.backend.config;

import com.saamauditoria.backend.entity.User;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {
    
    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.access-token.expiration}")
    private long accessTokenExpiration;
    
    private final JwtEncoder jwtEncoder;
    
    public JwtTokenProvider(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }
    
    public String generateAccessToken(User user) {
        Instant now = Instant.now();
        
        JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuer(issuer)
            .subject(user.getId().toString())
            .claim("email", user.getEmail())
            .claim("role", user.getRole())
            .expiresAt(now.plusSeconds(accessTokenExpiration))
            .issuedAt(now)
            .build();
        
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}
