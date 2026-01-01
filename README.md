# OneCoin

Backend de **OneCoin**, una red social corporativa desarrollada con **Node.js y Express**, que expone una API REST para la gestión de autenticación, publicaciones, comentarios, mensajes y solicitudes de amistad.

El proyecto sigue una arquitectura modular y escalable, utilizando **MongoDB** como base de datos y buenas prácticas de desarrollo backend moderno.

---

## Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose ODM)
- **JWT (JSON Web Tokens)** para autenticación
- **Swagger (OpenAPI 3.0)** para documentación de la API
- **Docker** para contenerización
- **CORS** para control de acceso desde el frontend
- **dotenv** para gestión de variables de entorno

---

## Arquitectura del Proyecto

El proyecto sigue una **arquitectura en capas (Layered Architecture)**, organizada de la siguiente manera:

controllers/ → Controladores con la lógica de negocio  
routes/ → Definición de endpoints y rutas HTTP  
models/ → Modelos de datos y esquemas de MongoDB (Mongoose)  
middleware/ → Middlewares de autenticación y validaciones


Esta estructura permite:
- Separación clara de responsabilidades
- Mejor mantenibilidad del código
- Escalabilidad para agregar nuevas funcionalidades

Actualmente no se implementa CQRS de forma estricta, pero la separación entre rutas, controladores y modelos facilita una futura evolución hacia arquitecturas más avanzadas.

---

## Autenticación y Seguridad

La API utiliza **JSON Web Tokens (JWT)** para la autenticación de usuarios.

### Características:
- Generación de token al iniciar sesión
- Protección de rutas privadas mediante middleware
- Validación del token en cada request protegido
- Uso de variables de entorno para claves sensibles

### Flujo de autenticación:
1. El usuario inicia sesión
2. El backend genera un JWT
3. El token se envía en el header: Authorization: Bearer <token>
4. El middleware valida el token antes de permitir el acceso

---

## Funcionalidades del Sistema

### Autenticación
- Registro de usuarios
- Inicio de sesión
- Validación de credenciales
- Generación de JWT

### Publicaciones
- Crear publicaciones
- Obtener lista de publicaciones
- Eliminar publicaciones propias

### Comentarios
- Crear comentarios asociados a publicaciones
- Listar comentarios por publicación

### Solicitudes de Amistad
- Enviar solicitudes de amistad
- Aceptar o rechazar solicitudes
- Gestión de relaciones entre usuarios

### Mensajería
- Envío de mensajes entre usuarios
- Consulta de mensajes
- Gestión de conversaciones privadas

---

## Base de Datos

El proyecto utiliza **MongoDB** como sistema de base de datos NoSQL, accediendo a ella mediante **Mongoose**.

### Modelos principales:
- User
- Post
- Comment
- Message
- FriendRequest

MongoDB permite flexibilidad en el esquema, buen rendimiento para relaciones sociales y escalabilidad horizontal.

---

## Documentación de la API (Swagger)

La API está documentada utilizando **Swagger (OpenAPI 3.0)**, lo que permite:

- Visualizar todos los endpoints disponibles
- Probar solicitudes directamente desde el navegador
- Consultar parámetros y respuestas

Ruta de acceso: http://localhost:3000/api-docs

---

## Configuración CORS

El backend permite solicitudes desde el frontend configurado mediante CORS:

Origen permitido: http://localhost:4200  
  
Métodos habilitados:
- GET
- POST
- PUT
- DELETE
- OPTIONS
- Soporte para credenciales

---

## Docker

El proyecto incluye un **Dockerfile** que permite ejecutar la aplicación en un contenedor.

Beneficios:
- Entorno consistente
- Fácil despliegue
- Independencia del sistema operativo
- Preparado para entornos cloud

---

## Variables de Entorno

Las variables de entorno se gestionan mediante un archivo `.env` (no incluido en el repositorio):

```env
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=your_secret_key
