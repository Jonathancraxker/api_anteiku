import { Router } from "express";
import { validateMid } from "../middlewares/validarMiddleware.js";
import { loginSchema, registroSchema, updatePasswordSchema, updateSchema } from "../schemas/users.schemas.js"; //Validación de datos
import { getUsers, getUserId, createUserCrud, updateUserId, deleteUserId } from "../controllers/users.admin.controller.js"; //CRUD usuarios

const router = Router();

// CRUD de usuarios para admin
router.get('/usuarios/', getUsers); //Obtener todos los usuarios
router.get('/usuarios/:id', getUserId); //Obtener información de un usuario por id
router.post('/usuarios/', createUserCrud); //Registrar un usuario desde administrador
router.patch('/usuarios/:id', validateMid(updateSchema), updateUserId); //Para modificar datos de usuario
router.delete('/usuarios/:id', deleteUserId); //Eliminar usuario

export default router;