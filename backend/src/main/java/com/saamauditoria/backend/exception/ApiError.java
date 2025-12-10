package com.saamauditoria.backend.exception;

import java.time.ZonedDateTime;
import java.util.Map;

public class ApiError {
 
    private int status;
    private String message;
    private ZonedDateTime timestamp;
    private Map<String, String> errors;
    
    public ApiError(int status, String message, ZonedDateTime timestamp, Map<String, String> errors) {
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
        this.errors = errors;
    }
    
    public ApiError(int status, String message, ZonedDateTime timestamp) {
        this(status, message, timestamp, null);
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(ZonedDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
}
