require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "http://localhost:4200", // frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true 
}));

app.use(express.json());

// Rutas
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const messagesRoutes = require("./routes/messages.routes");
const commentsRoutes = require("./routes/comments.routes");
const friendRequestsRoutes = require("./routes/friendRequests.routes");

// Swagger setup
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "OneCoin API",
    version: "1.0.0",
    description: "API para autenticación, publicaciones, mensajes, comentarios y solicitudes de amistad de OneCoin",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          username: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string" },
          role: { type: "string", enum: ["user", "admin"] },
          phone: { type: "string" },
          friendsId: { type: "array", items: { type: "string" } },
          rucEnterprise: { type: "string" }
        },
        required: ["username", "email", "password"]
      },
      Message: {
        type: "object",
        properties: {
          sender: { type: "string" },
          recipient: { type: "string" },
          content: { type: "string" },
          read: { type: "boolean" }
        },
        required: ["sender", "recipient", "content"]
      },
      Post: {
        type: "object",
        properties: {
          title: { type: "string" },
          content: { type: "string" },
          images: { type: "array", items: { type: "string" } },
          tags: { type: "array", items: { type: "string" } },
          privacy: { type: "string", enum: ["public", "friends", "private"] },
          location: {
            type: "object",
            properties: {
              name: { type: "string" },
              coordinates: { type: "array", items: { type: "number" } }
            }
          }
        }
      },
      Comment: {
        type: "object",
        properties: {
          content: { type: "string" },
          postId: { type: "string" }
        },
        required: ["content", "postId"]
      },
      FriendRequest: {
        type: "object",
        properties: {
          userIdReceiver: { type: "string" }
        },
        required: ["userIdReceiver"]
      }
    }
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Rutas documentadas con JSDoc
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/friend-requests", friendRequestsRoutes);

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("Mongo connection error:", err));
