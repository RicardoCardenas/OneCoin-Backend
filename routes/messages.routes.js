const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messages.controller");
const { verifyToken } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   - name: Messages
 *     description: Gestión de mensajes privados entre usuarios
 */

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Obtener todos los mensajes
 *     tags: [Messages]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Lista de mensajes
 *         content:
 *           application/json:
 *             example:
 *               - _id: "abc123"
 *                 sender: { _id: "u1", username: "alice" }
 *                 recipient: { _id: "u2", username: "bob" }
 *                 content: "Hola!"
 *                 sentAt: "2024-07-01T12:00:00Z"
 */
router.get("/", verifyToken, messagesController.getAllMessages);

/**
 * @swagger
 * /api/messages/conversation:
 *   get:
 *     summary: Obtener conversación entre dos usuarios
 *     tags: [Messages]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: query
 *         name: senderId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: receiverId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista ordenada de mensajes entre usuarios
 */
router.get("/conversation", verifyToken, messagesController.getConversation);

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Enviar mensaje
 *     tags: [Messages]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             sender: "64c76e123a..."
 *             recipient: "64d3fe9834..."
 *             content: "Hola, ¿cómo estás?"
 *     responses:
 *       201:
 *         description: Mensaje enviado
 *       400:
 *         description: Datos inválidos
 */
router.post("/", verifyToken, messagesController.createMessage);

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Obtener mensaje por ID
 *     tags: [Messages]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "64c76e...a7"
 *     responses:
 *       200:
 *         description: Mensaje encontrado
 *       404:
 *         description: No encontrado
 */
router.get("/:id", verifyToken, messagesController.getMessageById);

/**
 * @swagger
 * /api/messages/{id}:
 *   put:
 *     summary: Actualizar contenido de un mensaje
 *     tags: [Messages]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "64dfec98234..."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             content: "Mensaje editado"
 *             read: true
 *     responses:
 *       200:
 *         description: Mensaje actualizado
 *       404:
 *         description: No encontrado
 */
router.put("/:id", verifyToken, messagesController.updateMessage);

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: Eliminar mensaje por ID
 *     tags: [Messages]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "64dfec98234..."
 *     responses:
 *       200:
 *         description: Mensaje eliminado
 *       404:
 *         description: No encontrado
 */
router.delete("/:id", verifyToken, messagesController.deleteMessage);

/**
 * @swagger
 * /api/messages/{id}/read:
 *   patch:
 *     summary: Marcar mensaje como leído
 *     tags: [Messages]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "64dfec98234..."
 *     responses:
 *       200:
 *         description: Mensaje marcado como leído
 *       404:
 *         description: No encontrado
 */
router.patch("/:id/read", verifyToken, messagesController.markAsRead);

module.exports = router;
