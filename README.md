<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Geo Info Service

API REST construida con NestJS que provee información geográfica (países, departamentos, ciudades, barrios). El proyecto usa Supabase como almacenamiento, Swagger para documentación OpenAPI y está organizado siguiendo una arquitectura por capas (presentation / application / domain / infrastructure).

## Requisitos

- Node.js 18+ (o la versión LTS recomendada)
- npm o bun como gestor de paquetes
- Git

El proyecto usa TypeScript y NestJS (v11). Revisa `package.json` para versiones exactas.

## Instalación

Desde la raíz del proyecto:

```bash
# Instala dependencias
npm install
# o con bun
# bun install
```

Copia el archivo de ejemplo de variables de entorno y rellena las claves:

```bash
cp .env.example .env
# luego edita .env
```

Si no tienes `.env.example`, crea un `.env` con al menos:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
PORT=3000
```

> Nota: la aplicación espera `SUPABASE_ANON_KEY` (o `SUPABASE_KEY` si lo configuras así). Si ves el error `supabaseKey is required.` revisa que las variables no estén vacías y que arranques desde la raíz del proyecto.

## Scripts útiles

```bash
# Desarrollo con recarga
npm run start:dev

# Producción (build + run)
npm run build
npm run start:prod

# Linter
npm run lint

# Tests
npm run test
npm run test:e2e
```

Si usas bun, puedes mapear los scripts con `bun run <script>` si los tienes configurados.

## Documentación Swagger / OpenAPI

La documentación automática está habilitada. Una vez arrancada la app en `PORT` (por defecto 3000):

- Swagger UI: http://localhost:3000/docs
- JSON OpenAPI: http://localhost:3000/docs-json

## Estructura del proyecto (resumen)

- `src/`
  - `country/`, `department/`, `city/`, `neighborhood/` — módulos por entidad
    - `presentation/` — controllers, DTOs
    - `application/` — services (casos de uso)
    - `domain/` — contratos (interfaces, tokens)
    - `infrastructure/` — implementaciones (Supabase repositories)
  - `supabase/` — módulo para crear y exportar el cliente de Supabase
  - `shared/types/` — tipos compartidos (database, modelos)
  - `main.ts` — bootstrap de Nest, validaciones y swagger

El proyecto sigue la separación de responsabilidades (hexagonal / clean-ish): controllers -> services -> repositories.

## Notas importantes / Troubleshooting

- Error de inyección: "Nest can't resolve dependencies of the supabaseClient (?)... ConfigModule"
  - Asegúrate de inyectar `ConfigService` (no `ConfigModule`) en los providers. El módulo `SupabaseModule` debe importar `ConfigModule` y usar `inject: [ConfigService]`.

- Error "supabaseKey is required." al crear el cliente Supabase
  - Significa que la variable de entorno del key está vacía o no fue cargada. Verifica:
    - Que `.env` existe en la raíz y contiene `SUPABASE_URL` y `SUPABASE_ANON_KEY`.
    - Que `ConfigModule.forRoot({ isGlobal: true })` está configurado en `AppModule` (ya incluido en el proyecto).

- Linter: advertencia `no-floating-promises` en `main.ts`
  - Se resolvió usando `void bootstrap();` para indicar explícitamente que se ignora la promesa al final del fichero.

- Alias de importación: el `tsconfig.json` define `@/*` apuntando a `src/*`. Usa `@/` para imports absolutos en lugar de `src/` para mantener consistencia.

## Buenas prácticas aplicadas

- Cada repositorio usa un token exportado (`CITY_REPOSITORY`, `DEPARTMENT_REPOSITORY`, etc.) para permitir mocking y reemplazo de implementaciones.
- Servicios son `providers` y se exportan cuando deben ser reutilizables por otros módulos.
- Repositorios que usan Nest DI están marcados con `@Injectable()`.
- Validación global con `ValidationPipe` y transformación habilitada.

## Desarrollo y pruebas locales

1. Rellena `.env` con tu Supabase URL y KEY.
2. Arranca la app en modo dev:

```bash
npm run start:dev
```

3. Visita `http://localhost:3000/docs` para ver la API y probar endpoints.

## Contribuciones

Pull requests bienvenidos. Antes de enviar PR:

- Corre `npm run lint` y arregla warnings relevantes
- Añade tests cuando cambies lógica de negocio
- Mantén consistencia con los alias `@/` y la estructura de carpetas

## Licencia

Por defecto este repositorio no indica licencia (`UNLICENSED` en package.json). Cambia el archivo `LICENSE` si quieres publicar con una licencia explícita.

---

Si quieres, puedo:

- Generar un archivo `.env.example` automáticamente en el repo.
- Añadir un pequeño script de healthcheck o un endpoint `/health`.
- Añadir instrucciones para ejecutar con Docker.

Dime qué prefieres y lo añado.
