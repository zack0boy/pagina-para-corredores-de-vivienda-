# Corredores Backend

Este proyecto es un backend construido con NestJS y TypeScript. Aquí están los pasos necesarios para que otra persona pueda instalarlo y ejecutarlo.

## Requisitos previos

- Node.js 18 o superior
- npm 10 o superior
- Base de datos MySQL o PostgreSQL configurada
- Acceso al proyecto desde `pagina/corredores/backend`

## Instalación

1. Ve al directorio del backend:

```bash
cd pagina/corredores/backend
```

2. Instala dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del backend con las variables de entorno necesarias para tu base de datos. Ejemplo:

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=usuario
DB_PASSWORD=contraseña
DB_DATABASE=nombre_basedatos
```

> Si usas PostgreSQL, cambia `DB_TYPE=postgres` y ajusta el puerto y las credenciales.

## Comandos principales

```bash
# ejecutar en modo desarrollo con recarga automática
npm run start:dev

# compilar el proyecto
npm run build

# ejecutar en modo producción
npm run start:prod

# ejecutar pruebas unitarias
npm run test

# ejecutar pruebas e2e
npm run test:e2e

# formatear código
npm run format

# corregir problemas de lint automáticamente
npm run lint
```

## Notas importantes

- No es necesario instalar `@nestjs/cli` globalmente, los scripts ya usan las dependencias del proyecto.
- Guarda los datos sensibles en `.env` y no los subas al repositorio.
- Cada vez que modifiques `package.json`, ejecuta `npm install` de nuevo.

## Estructura del proyecto

- `src/` - código fuente principal
- `src/auth/` - módulo de autenticación
- `src/users/` - módulo de usuarios
- `src/propiedad/` - módulo de propiedad
- `src/propietario/` - módulo de propietario
- `src/pagos/` - módulo de pagos
- `src/reservas/` - módulo de reservas
- `src/contratos/` - módulo de contratos
- `test/` - pruebas end-to-end

## Archivo `.gitignore`

El repositorio ya ignora carpetas y archivos que no deben subirse, como `node_modules`, `dist`, archivos de logs y variables de entorno.

## Recursos útiles

- Documentación de NestJS: https://docs.nestjs.com
- Documentación de TypeORM: https://typeorm.io
- Documentación de MySQL: https://dev.mysql.com/doc
- Documentación de PostgreSQL: https://www.postgresql.org/docs/
