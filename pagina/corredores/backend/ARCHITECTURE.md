# Arquitectura del Backend - Sistema de Corredores de Vivienda

## 📋 Visión General

El backend está estructurado de forma **modular** usando NestJS con TypeORM. Cada módulo es independiente pero se comunica a través de servicios inyectados.

## 🏗️ Estructura de Módulos

### 1. **UserModule** (`src/modules/user/`)
**Responsabilidad:** Gestión de usuarios, clientes y corredores.

**Entidades:**
- `Usuario`: Usuario base con rol, email, contraseña
- `Cliente`: Extiende Usuario con datos de cliente (RUT, teléfono, dirección)
- `Corredor`: Extiende Usuario con datos de corredor (licencia profesional)
- `UsersGoogle`: Tokens de Google OAuth2 para calendar

**Servicios:**
- `UserService`: CRUD de clientes y corredores

**Controlador:**
- `UserController`: Endpoints `/users/clientes/*` y `/users/corredores/*`

**Seguridad:**
- Solo ADMIN puede crear corredores
- Clientes pueden auto-registrarse

---

### 2. **PropertyModule** (`src/modules/property/`)
**Responsabilidad:** Gestión de propiedades e imágenes.

**Entidades:**
- `Propiedad`: Propiedad con precio, tipo, operación (venta/arriendo), estado
- `PropiedadImagen`: Imágenes en Cloudinary con URL y public_id

**Servicios:**
- `PropertyService`: CRUD + búsqueda con filtros dinámicos
  - Filtros: `precioMin`, `precioMax`, `tipo`, `estado`, `operacion`
  - Usa `QueryBuilder` de TypeORM para búsquedas flexibles
  - Integración con `CloudinaryService` para subir imágenes

**Controlador:**
- `PropertyController`: 
  - `GET /propiedades` - Búsqueda con filtros dinámicos
  - `POST /propiedades` - Crear (solo CORREDOR, ADMIN)
  - `POST /propiedades/:id/imagenes` - Subir imagen
  - `PATCH /propiedades/imagenes/:idImagen/principal` - Marcar como principal

---

### 3. **TransactionModule** (`src/modules/transaction/`)
**Responsabilidad:** Gestión de reservas, contratos, cuotas y pagos.

**Entidades:**
- `Reserva`: Reserva de propiedad por cliente
- `Contrato`: Contrato asociado a una reserva
- `Cuota`: Cuota de pago dentro de un contrato
- `Pago`: Registro de pago realizado

**Servicios:**
- `TransactionService`: Orquestación de todo el flujo de transacciones
  - **Validaciones importantes:**
    - Reserva: Valida que propiedad esté disponible (usando `PropertyService`)
    - Contrato: Solo se crea si reserva está pendiente
    - Pago: No permite superar el monto de la cuota

**Flujo Típico:**
```
Cliente crea Reserva
    ↓
Corredor crea Contrato (basado en Reserva)
    ↓
Sistema genera Cuotas automáticamente
    ↓
Cliente realiza Pagos
    ↓
Cuota se marca como ACTIVO cuando está pagada
```

**Controlador:**
- `TransactionController`:
  - `POST /transacciones/reservas` - Crear reserva (solo CLIENTE)
  - `POST /transacciones/contratos` - Crear contrato (solo CORREDOR, ADMIN)
  - `POST /transacciones/cuotas` - Crear cuota (solo CORREDOR, ADMIN)
  - `POST /transacciones/pagos` - Crear pago (solo CLIENTE)

---

### 4. **SystemModule** (`src/modules/system/`)
**Responsabilidad:** Configuraciones globales, notificaciones e historial de cambios.

**Entidades:**
- `ConfiguracionSitio`: Almacena configuraciones clave-valor (comisiones, horarios, etc.)
- `Notificacion`: Notificaciones para usuarios
- `HistorialCambios`: Auditoría automática de cambios (via EntitySubscriber)

**Servicios:**
- `SystemService`: CRUD de configuraciones

**Controlador:**
- `SystemController`:
  - `GET /sistema/configuraciones` - Listar todas (solo ADMIN)
  - `POST /sistema/configuraciones` - Crear (solo ADMIN)
  - `PATCH /sistema/configuraciones/:id` - Actualizar (solo ADMIN)
  - `GET /sistema/configuraciones/clave/:clave` - Obtener por clave (público)

---

## 🔐 Seguridad y Guards

### RolesGuard
- **Ubicación:** `src/common/guards/roles.guard.ts`
- **Uso:** Decorator `@Roles(RolUsuario.ADMIN, RolUsuario.CORREDOR)`
- **Roles disponibles:** ADMIN, CLIENTE, CORREDOR

### JwtAuthGuard
- **Ubicación:** `src/common/guards/jwt-auth.guard.ts`
- **Uso:** `@UseGuards(JwtAuthGuard)`
- **Verifica:** Token JWT válido en Authorization header

### Patrón de Protección
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RolUsuario.ADMIN)
async deleteProperty() { ... }
```

---

## 📊 Auditoría Automática

### EntitySubscriber
**Ubicación:** `src/common/subscribers/historial.subscriber.ts`

Escucha cambios en:
- `Propiedad`
- `Reserva`
- `Cuota`
- `Pago`
- `Contrato`
- `Usuario`

Registra automáticamente en `historial_cambios`:
```json
{
  "entidadAfectada": "Propiedad",
  "idRegistro": 1,
  "accion": "UPDATE",
  "valoresAnteriores": { ... },
  "valoresNuevos": { ... },
  "idUsuario": 5,
  "fecha": "2024-01-15T10:30:00Z"
}
```

---

## 🔗 Conexiones Entre Módulos

### UserModule → PropertyModule
```
Usuario (Corredor) → crea → Propiedad
```

### PropertyModule → TransactionModule
```
Propiedad → reserva → Reserva
       ↓
Validación de estado en PropertyService
```

### TransactionModule → SystemModule
```
ConfiguracionSitio (comisión) → usada en cálculo de Pago
```

### Inyección de Dependencias
```typescript
// En TransactionService
constructor(
  private propertyService: PropertyService,  // Para validar propiedades
  @InjectRepository(Reserva)
  private reservaRepository: Repository<Reserva>,
) {}
```

---

## 📝 DTOs y Validación

Todos los DTOs usan `class-validator`:

```typescript
export class CreatePropiedadDto {
  @IsString()
  @Length(1, 200)
  titulo!: string;

  @IsNumber()
  @Min(0.01)
  precio!: number;

  @IsEnum(TipoOperacion)
  operacion!: TipoOperacion;
}
```

**Beneficios:**
- Validación automática en decoradores de controlador
- Errores claros si datos no cumplen requisitos
- Documentación auto-generada para Swagger

---

## 🔍 Búsqueda Dinámica de Propiedades

El módulo de propiedades usa `QueryBuilder` de TypeORM para búsqueda flexible:

```typescript
// GET /propiedades?precioMin=100000&precioMax=500000&tipo=casa&estado=disponible

GET /propiedades?precioMin=100000&precioMax=500000&tipo=casa
  ↓
PropertyService.findAll(BuscarPropiedadesDto)
  ↓
buildSearchQuery() → crea QueryBuilder dinámico
  ↓
Retorna: { data: Propiedad[], total: number }
```

---

## 📦 Variables de Entorno Requeridas

```env
# Database (Aiven PostgreSQL)
DB_HOST=xxx.databases.aiven.io
DB_PORT=13054
DB_USERNAME=avnadmin
DB_PASSWORD=xxx
DB_NAME=xxx

# JWT
JWT_SECRET=tu_super_secreto_aqui
TOKEN_EXPIRATION=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Google OAuth
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback

# Entorno
NODE_ENV=development
PORT=3000
```

---

## 🚀 Flujo Completo: Cliente hace Reserva

```
1. CLIENTE se registra
   POST /users/clientes
   → UserService.createCliente()
   → Crea Usuario + Cliente

2. CORREDOR crea Propiedad
   POST /propiedades
   → PropertyService.create()
   → Suba imagen: POST /propiedades/1/imagenes

3. CLIENTE busca propiedades
   GET /propiedades?precioMin=100000&precioMax=300000
   → PropertyService.findAll(filters)
   → QueryBuilder con filtros dinámicos

4. CLIENTE hace reserva
   POST /transacciones/reservas
   → TransactionService.createReserva()
   → Valida que Propiedad esté disponible (PropertyService)
   → Crea Reserva en estado PENDIENTE

5. CORREDOR crea Contrato
   POST /transacciones/contratos
   → TransactionService.createContrato()
   → Cambia Reserva a estado ACTIVO
   → Crea Cuotas automáticamente

6. CLIENTE paga cuota
   POST /transacciones/pagos
   → TransactionService.createPago()
   → Valida monto
   → Registra Pago

7. EntitySubscriber registra TODOS los cambios
   → HistorialCambios table
   → Con valores anteriores y nuevos
```

---

## 🛠️ Próximas Mejoras

- [ ] Rate limiting por usuario
- [ ] Caché en búsquedas de propiedades
- [ ] Notificaciones en tiempo real (WebSocket)
- [ ] Generación automática de cuotas
- [ ] Integración con pasarelas de pago (Webpay, etc.)
- [ ] Reportes de auditoría por usuario
- [ ] Soft delete en entidades importantes

---

**Última actualización:** Junio 2026
