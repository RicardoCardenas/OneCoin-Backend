const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  getPostsByUser,
  updatePost,
  updateLikes,
  getLikes
} = require("../controllers/post.controller");
const { verifyToken } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Gestión de publicaciones de usuarios
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Obtener todas las publicaciones
 *     tags: [Posts]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 *         content:
 *           application/json:
 *             example:
 *               - _id: "post1"
 *                 title: "Primer post"
 *                 content: "Texto del post"
 *                 author: { _id: "user1", username: "alice" }
 *                 likesCount: 5
 */
router.get("/", verifyToken, getPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Obtener post por ID
 *     tags: [Posts]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "64efc9238f..."
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: No encontrado
 */
router.get("/:id", verifyToken, getPostById);

/**
 * @swagger
 * /api/posts/userId/{userId}:
 *   get:
 *     summary: Obtener publicaciones por ID de usuario
 *     tags: [Posts]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "64eec91a7f..."
 *     responses:
 *       200:
 *         description: Lista de posts del usuario
 */
router.get("/userId/:userId", verifyToken, getPostsByUser);

/**
 * @swagger
 * /api/posts/{id}/likes:
 *   get:
 *     summary: Obtener usuarios que dieron like a un post
 *     tags: [Posts]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "64efc9238f..."
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/:id/likes", verifyToken, getLikes);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Crear nueva publicación
 *     tags: [Posts]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Nuevo post"
 *             content: "Hola a todos"
 *             images: ["https://imgur.com/abc.jpg"]
 *             tags: ["novedad", "foto"]
 *             privacy: "friends"
 *             location:
 *               name: "Lima"
 *               coordinates: [-12.0464, -77.0428]
 *     responses:
 *       201:
 *         description: Post creado
 *       400:
 *         description: Error en la creación
 */
router.post("/", verifyToken, createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Actualizar una publicación
 *     tags: [Posts]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "64efc9238f..."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Título actualizado"
 *             content: "Nuevo contenido"
 *             tags: ["actualización"]
 *             privacy: "private"
 *     responses:
 *       200:
 *         description: Publicación actualizada
 *       404:
 *         description: Publicación no encontrada
 */
router.put("/:id", verifyToken, updatePost);

/**
 * @swagger
 * /api/posts/{id}/likes:
 *   put:
 *     summary: Agregar o quitar like de un usuario
 *     tags: [Posts]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "64efc9238f..."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "64a19e3..."
 *     responses:
 *       200:
 *         description: Like actualizado
 *       400:
 *         description: Error en la operación
 */
router.put("/:id/likes", verifyToken, updateLikes);

module.exports = router;
