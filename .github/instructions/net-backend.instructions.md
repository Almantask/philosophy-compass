---
applyTo: "api/**"
---
# GitHub Copilot Instructions – .NET Backend

You are assisting with a production-grade .NET backend.

## Tech Stack

- Runtime: .NET 8 (preferred) or latest LTS
- Language: C#
- Application type: ASP.NET Core Web API
- Data access: Entity Framework Core
- Database: SQL Server (default) unless specified otherwise
- API style: RESTful, JSON-based
- Auth: JWT Bearer authentication when authentication is needed
- Documentation: OpenAPI/Swagger via `Swashbuckle.AspNetCore`

## Architecture & Structure

Follow Clean Architecture / modular design principles:

- `src/`
  - `Api` (presentation layer: controllers, filters, DI wiring)
  - `Application` (use cases, DTOs, interfaces, validation)
  - `Domain` (entities, value objects, enums, domain events, pure logic)
  - `Infrastructure` (EF Core DbContext, repositories, external services, configuration)
- `tests/`
  - `Api.Tests`
  - `Application.Tests`
  - `Domain.Tests`
  - `Infrastructure.Tests`

Guidelines:
- Controllers must be thin: delegate to Application layer (services/handlers).
- Domain must not depend on Application, Infrastructure, or Api.
- Application depends only on Domain (and abstractions).
- Infrastructure implements Application abstractions; wired via DI in Api.

## Coding Conventions

- Use `async`/`await` end-to-end. Suffix async methods with `Async`.
- Use dependency injection; no service locator, no `new`ing infrastructure in controllers.
- Prefer interfaces for infrastructure boundaries (repositories, gateways).
- Use records or classes with value objects where appropriate.
- Use nullable reference types enabled.
- Use `ILogger<T>` for logging; no `Console.WriteLine`.
- Return appropriate HTTP status codes:
  - 200/201 for success
  - 400 for validation errors
  - 401/403 for auth issues
  - 404 for not found
  - 409 for conflicts
  - 500 only for unexpected errors (handled via middleware)

## EF Core & Persistence

- Use a dedicated `AppDbContext` in `Infrastructure`.
- Use Fluent API configuration classes (per entity) instead of heavy data annotations.
- Use migrations (`dotnet ef migrations`) instead of `EnsureCreated` in production.
- For repositories:
  - Prefer async LINQ queries.
  - Expose domain models, not EF tracking types.
- Map between Domain and DTOs in Application or Api; keep Db models aligned with domain where practical.

## Validation & Error Handling

- Use FluentValidation or ASP.NET Core model validation.
- For each endpoint:
  - Validate input.
  - Return ProblemDetails-style responses for errors when possible.
- Add global exception-handling middleware:
  - Map known exceptions (e.g., `ValidationException`, `NotFoundException`) to proper status codes.
- Include clear, typed error responses.

## Security & Auth

When adding security:
- Use JWT Bearer authentication middleware.
- Store secrets in configuration (User Secrets, Key Vault, or environment variables), not in source.
- Validate input to avoid injection issues even with EF Core.
- Add CORS configuration explicitly; do not use `AllowAnyOrigin` in production unless stated.

## Logging & Observability

- Use structured logging with `ILogger`.
- Log:
  - Requests at debug/trace if enabled.
  - Warnings for recoverable issues.
  - Errors with context but no sensitive data.
- Add basic health check endpoint `/health`.

## Testing

When generating code:
- Provide example unit tests (xUnit or NUnit).
- Test:
  - Application services/handlers
  - Domain logic (pure functions/entities)
- Use in-memory or testcontainers-based setups for integration tests when relevant.

## API Design

When implementing endpoints:
- Use RESTful resource naming: `/api/v1/{resource}`.
- Support pagination/filtering for list endpoints (`page`, `pageSize`, etc.).
- Include OpenAPI annotations / XML comments where useful.
- Ensure Swagger is enabled in development.

## Style

- Follow Microsoft C# conventions:
  - PascalCase for public members/types.
  - camelCase for locals and parameters.
- Keep methods short and focused.
- Prefer readability over cleverness.
- Add summaries on public APIs & important types.

## What NOT to do

- Do NOT hardcode secrets or connection strings.
- Do NOT mix UI/front-end logic into this backend.
- Do NOT put business rules in controllers or EF configurations.
- Do NOT bypass DI for core services.

When in doubt, produce:
- Clean Architecture–friendly structure
- Asynchronous, testable, well-logged, and well-validated code
- Minimal but complete examples (controller + DTO + application service + domain + infra)
