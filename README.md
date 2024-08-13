# API REST de Gerenciamento de Salões

Este projeto é uma API RESTful desenvolvida para gerenciar serviços de salões de beleza, incluindo clientes, colaboradores, serviços, cupons, horários e agendamentos. A API foi construída usando Express, TypeScript, e inclui documentação via Swagger.

## Funcionalidades

- **Autenticação de Clientes**: Registro, login e renovação de tokens de acesso.
- **Gerenciamento de Salões**: Criação, atualização, exclusão, listagem de salões, e gerenciamento de fotos.
- **Gerenciamento de Colaboradores**: Criação, atualização, exclusão de colaboradores, e upload de fotos.
- **Gerenciamento de Serviços**: Criação, atualização, exclusão de serviços, e upload de fotos.
- **Gerenciamento de Cupons**: Criação, atualização e exclusão de cupons de desconto.
- **Gerenciamento de Horários**: Criação, atualização e exclusão de horários para agendamentos.
- **Gerenciamento de Agendamentos**: Criação de agendamentos, filtragem de agendamentos e verificação de disponibilidade de horários.

## Tecnologias Utilizadas

- **Express**: Framework para construção de APIs em Node.js.
- **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática ao código.
- **CORS**: Middleware para permitir requisições de diferentes domínios.
- **Multer**: Middleware para upload de arquivos (fotos de colaboradores e salões).
- **Swagger**: Ferramenta para documentação interativa da API.
- **Express Async Errors**: Tratamento de erros assíncronos no Express.

## Documentação da API

A documentação da API é gerada automaticamente pelo Swagger e pode ser acessada via [http://localhost:3333/api-docs](http://localhost:3333/api-docs).

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   
## Rotas

### Autenticação
- **POST /auth/register**: Registra um novo cliente.
- **POST /auth/login**: Realiza login de um cliente.
- **POST /auth/login/access-token**: Renova o token de acesso.

### Clientes
- **GET /cliente/salao**: Lista os salões inscritos pelo cliente.
- **GET /cliente/:id/favoritar**: Inscreve o cliente em um salão.

### Colaboradores
- **POST /colaborador**: Cria um novo colaborador (com upload de foto).
- **PUT /colaborador/:id**: Atualiza um colaborador (com upload de foto).
- **DELETE /colaborador/:id**: Remove um colaborador.

### Salões
- **POST /salao**: Cria um novo salão (com upload de foto e capa).
- **DELETE /salao/:id**: Remove um salão.
- **PUT /salao/:id**: Atualiza os dados de um salão.
- **POST /salao/filter**: Filtra salões por distância, cidade, ou nome.
- **GET /salao/:id**: Detalha as informações de um salão.
- **GET /salao/clientes/:id**: Lista os clientes inscritos em um salão.
- **GET /salao/colaboradores/:id**: Lista os colaboradores de um salão.
- **GET /salao/horarios/:id**: Lista os horários disponíveis de um salão.
- **GET /salao/cupons/:id**: Lista os cupons de um salão.
- **GET /salao/servicos/:id**: Lista os serviços oferecidos por um salão.

### Cupons
- **POST /cupom**: Cria um novo cupom.
- **PUT /cupom/:id**: Atualiza um cupom existente.
- **DELETE /cupom/:id**: Remove um cupom.

### Serviços
- **POST /servico**: Cria um novo serviço (com upload de foto).
- **PUT /servico/:id**: Atualiza os dados de um serviço.
- **DELETE /servico/:id**: Remove um serviço.

### Horários/Agenda
- **POST /horario**: Cria um novo horário.
- **POST /horario/colaboradores**: Lista os horários disponíveis de colaboradores para um serviço específico.
- **PUT /horario/:id**: Atualiza um horário existente.
- **DELETE /horario/:id**: Remove um horário.

### Agendamentos
- **POST /agendamento**: Cria um novo agendamento.
- **POST /agendamento/filter**: Filtra agendamentos por data.
- **POST /agendamento/dias-disponiveis**: Verifica a disponibilidade de horários.

## Tratamento de Erros

A API inclui um middleware de tratamento de erros para capturar exceções e retornar respostas adequadas.

- **400**: Erro de validação ou solicitação inválida.
- **500**: Erro interno do servidor.
