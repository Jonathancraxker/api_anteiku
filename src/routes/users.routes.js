import { Router } from "express";
import { validateMid } from "../middlewares/validarMiddleware.js";
import { authToken } from "../middlewares/validarToken.js";
import { createUserCrudSchema, loginSchema, registroSchema, updatePasswordSchema, updateProfileSchema, updateSchema } from "../schemas/users.schemas.js"; //Validación de datos
import { getUsers, getUserId, createUserCrud, updateUserId, deleteUserId, updateUserIdPassword } from "../controllers/users.admin.controller.js"; //CRUD usuarios
import { createUser, loginUser, logout } from "../controllers/auth.controller.js";
import { deleteProfile, getProfile, updateProfile, updateProfilePassword } from "../controllers/profile.controller.js";


const router = Router();

// Rutas para Login
router.post('/signup/', validateMid(registroSchema), createUser); //Registrar un usuario
router.post('/login/', validateMid(loginSchema), loginUser); //Iniciar sesión
router.post('/logout/', logout); // Cerrar sesión eliminando token de cookies

// CRUD de usuarios para admin
router.get('/users/', getUsers); //Obtener todos los usuarios
router.get('/users/:id', getUserId); //Obtener información de un usuario por id
router.post('/users/', validateMid(createUserCrudSchema), createUserCrud); //Registrar un usuario desde administrador
router.put('/users/:id', validateMid(updateSchema), updateUserId); //Para modificar datos de usuario
router.delete('/users/:id', deleteUserId); //Eliminar usuario

//Para modificar solo la contraseña de un usuario
// router.put('/users/password/:id', validateMid(updatePasswordSchema), updateUserIdPassword);

//Perfil de usuario
router.get('/profile/', authToken, getProfile);
router.put('/profile/', authToken, validateMid(updateProfileSchema), updateProfile);
router.put('/profile/password', authToken, updateProfilePassword);
router.delete('/profile/', authToken, deleteProfile);



export default router;