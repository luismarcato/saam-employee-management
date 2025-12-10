# SAAM Employee Management

Este projeto é um teste prático para avaliação de desenvolvedores Java Web (Full Stack). A aplicação desenvolvida é um **sistema de gestão de funcionários** que pode ser executado localmente através de Docker, com backend em Java Spring Boot, frontend em React.js e banco de dados PostgreSQL.

## Instruções de Uso

### 1. Pré-requisitos:

- Docker
- Docker Compose

### 2. Clonar o repositório:

```bash
git clone <link-do-repo>
cd saam-employee-management
```

### 3. Subir a aplicação completa:

```bash
docker-compose up --build
```

### 4. Acessar:

- Frontend: `http://localhost:8081`
- Backend API: `http://localhost:8080/api/v1`

### 5. Login no sistema:

- Email: `admin@saamauditoria.com`
- Senha `admin123@`

## Tecnologias utilizadas

### Backend

- Java 21
- Spring Boot
- Spring Data JPA
- Spring Security
- OAuth2 Authorization Server
- Spring Boot Validation
- Spring Web MVC
- FlywayDB
- PostgreSQL

### Frontend

- React
- Vite
- Material - UI (MUI)
- React Router
- React Hook Form
- Zod
- Axios
- React Number Format
- @tanstack/react-query

## Endpoints da API

- Authentication:

  - POST `/api/v1/auth/login` - Login de usuário

- Employees:

  - POST `/api/v1/employees` - Cria um novo funcionário
  - GET `/api/v1/employees` - Lista todos os funcionários
  - GET `/api/v1/employees/{id}` - Lista detalhes de um funcionário
  - PUT `/api/v1/employees/{id}` - Atualiza um funcionário
  - DELETE `/api/v1/employees/{id}` - Deleta um funcionário

## Crenciais de acesso (FLYWAY - Seed)

- Email: `admin@saamauditoria.com`
- Senha `admin123@`

