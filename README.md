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
