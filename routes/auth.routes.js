const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  getUserFriends,
  updateUserFriends
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Registro, login y gestión de usuarios
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             username: "maria"
 *             email: "maria@example.com"
 *             password: "123456"
 *             role: "user"
 *             phone: "987654321"
 *             rucEnterprise: "123456789"
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Error al registrar
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "maria@example.com"
 *             password: "123456"
 *     responses:
 *       200:
 *         description: Login exitoso con token JWT
 *       400:
 *         description: Credenciales inválidas
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Auth]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/users", verifyToken, getAllUsers);

/**
 * @swagger
 * /api/auth/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Auth]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/users/:id", verifyToken, getUserById);

/**
 * @swagger
 * /api/auth/users/{id}:
 *   put:
 *     summary: Actualizar datos del usuario
 *     tags: [Auth]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             phone: "123123123"
 *             rucEnterprise: "111111111"
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put("/users/:id", verifyToken, updateUser);

/**
 * @swagger
 * /api/auth/users/{id}/friendsId:
 *   get:
 *     summary: Obtener lista de amigos
 *     tags: [Auth]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de amigos
 */
router.get("/users/:id/friendsId", verifyToken, getUserFriends);

/**
 * @swagger
 * /api/auth/users/{id}/friendsId:
 *   put:
 *     summary: Actualizar lista de amigos
 *     tags: [Auth]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             friendsId: ["64a111...", "64a222..."]
 *     responses:
 *       200:
 *         description: Lista de amigos actualizada
 */
router.put("/users/:id/friendsId", verifyToken, updateUserFriends);

module.exports = router;
