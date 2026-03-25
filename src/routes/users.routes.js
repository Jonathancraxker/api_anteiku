import { Router } from "express";
import { validateMid } from "../middlewares/validarMiddleware.js";
import { loginSchema, registroSchema, updatePasswordSchema, updateSchema } from "../schemas/users.schemas.js"; //Validación de datos
import { getUsers, getUserId, createUserCrud, updateUserId, deleteUserId, updatePassword } from "../controllers/users.admin.controller.js"; //CRUD usuarios
import { createUser, loginUser } from "../controllers/auth.controller.js";


const router = Router();

// Rutas para Login
router.post('/signup/', validateMid(registroSchema), createUser); //Registrar un usuario
router.post('/login/', validateMid(loginSchema), loginUser); //Iniciar sesión

// CRUD de usuarios para admin
router.get('/usuarios/', getUsers); //Obtener todos los usuarios
router.get('/usuarios/:id', getUserId); //Obtener información de un usuario por id
router.post('/usuarios/', validateMid(registroSchema), createUserCrud); //Registrar un usuario desde administrador
router.put('/usuarios/:id', validateMid(updateSchema), updateUserId); //Para modificar datos de usuario
router.delete('/usuarios/:id', deleteUserId); //Eliminar usuario

//Para modificar solo la contraseña de usuario
router.put('/usuarios/password/:id', validateMid(updatePasswordSchema), updatePassword);



export default router;