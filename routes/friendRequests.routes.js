const express = require("express");
const router = express.Router();
const {
  sendRequest,
  getSentRequests,
  getReceivedRequests,
  updateRequestStatus
} = require("../controllers/friendRequest.controller");
const { verifyToken } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   - name: FriendRequests
 *     description: Gestión de solicitudes de amistad entre usuarios
 */

/**
 * @swagger
 * /api/friend-requests:
 *   post:
 *     summary: Enviar solicitud de amistad
 *     tags: [FriendRequests]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userIdEmissor: "64a1abc..."
 *             userIdReceiver: "64b2cde..."
 *     responses:
 *       201:
 *         description: Solicitud enviada
 *       400:
 *         description: Error al enviar solicitud
 */
router.post("/", verifyToken, sendRequest);

/**
 * @swagger
 * /api/friend-requests/emissorId/{userId}:
 *   get:
 *     summary: Obtener solicitudes enviadas por un usuario
 *     tags: [FriendRequests]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64a1abc..."
 *     responses:
 *       200:
 *         description: Lista de solicitudes enviadas
 *         content:
 *           application/json:
 *             example:
 *               - _id: "req123"
 *                 accepted: false
 *                 userIdEmissor: "64a1abc..."
 *                 userIdReceiver: "64b2cde..."
 */
router.get("/emissorId/:userId", verifyToken, getSentRequests);

/**
 * @swagger
 * /api/friend-requests/receiverId/{userId}:
 *   get:
 *     summary: Obtener solicitudes recibidas por un usuario
 *     tags: [FriendRequests]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64b2cde..."
 *     responses:
 *       200:
 *         description: Lista de solicitudes recibidas
 *         content:
 *           application/json:
 *             example:
 *               - _id: "req123"
 *                 accepted: false
 *                 userIdEmissor: "64a1abc..."
 *                 userIdReceiver: "64b2cde..."
 */
router.get("/receiverId/:userId", verifyToken, getReceivedRequests);

/**
 * @swagger
 * /api/friend-requests/{id}/accepted:
 *   put:
 *     summary: Aceptar o rechazar una solicitud de amistad
 *     tags: [FriendRequests]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "req123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             accepted: true
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       404:
 *         description: Solicitud no encontrada
 */
router.put("/:id/accepted", verifyToken, updateRequestStatus);

module.exports = router;
