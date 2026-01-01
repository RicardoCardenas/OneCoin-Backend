const express = require("express");
const router = express.Router();
const controller = require("../controllers/comment.controller");
const { verifyToken } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Comentarios en publicaciones
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Crear comentario
 *     tags: [Comments]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *           example:
 *             content: "Muy buena publicación"
 *             postId: "64b67caa81fd3a9e5c5fa0e2"
 *     responses:
 *       201:
 *         description: Comentario creado
 *       400:
 *         description: Datos inválidos
 */
router.post("/", verifyToken, controller.createComment);

/**
 * @swagger
 * /api/comments/postId/{postId}:
 *   get:
 *     summary: Obtener comentarios de una publicación
 *     tags: [Comments]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *       500:
 *         description: Error del servidor
 */
router.get("/postId/:postId", verifyToken, controller.getCommentsByPost);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Actualizar comentario
 *     tags: [Comments]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             content: "Comentario actualizado"
 *     responses:
 *       200:
 *         description: Comentario actualizado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Comentario no encontrado
 */
router.put("/:id", verifyToken, controller.updateComment);

module.exports = router;
