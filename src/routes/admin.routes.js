// import { Router } from "express";
// import { validateMid } from "../middlewares/validarMiddleware.js";
// import { createUsuario, loginUsuario, logout, profile, status, createUsuarioCRUD, refreshToken } from "../controllers/users.controller.js"; //Login y Registro
// import { loginSchema, registroSchema, updatePasswordSchema, updateSchema } from "../schemas/users.schemas.js"; //Validación de datos
// import { getUsers, getUserId, deleteUserId, updateUserId } from "../models/users.model.js"; //CRUD usuarios
// import { authToken } from "../middlewares/validarToken.js"; //verificación de token existente
// import { updateUserById, updateUserByPassword } from "../models/profile.model.js"; //Perfil de usuario

// const router = Router();

// // Rutas para Registro y login
// router.post('/usuarios/registro', validateMid(registroSchema), createUsuario); //Registro
// router.post('/usuarios/login', validateMid(loginSchema), loginUsuario); //Login
// router.post('/usuarios/refresh', refreshToken); //refreshToken
// router.post('/logout', logout); // Cerrar sesión eliminando token de cookies

// //obtener datos de usuario logeado (perfil de usuario)
// router.get('/usuarios/perfil', authToken, profile); // Protección de ruta con authToken validando el token existente

// // Ruta para verificar la sesión del usuario a través de la cookie, de la mano se usa context en el frontend para toda la aplicación, y en el main.jsx se agrega el context
// router.get('/usuarios/status', authToken, status);

// // CRUD de usuarios para admin
// router.get('/usuarios/', getUsers); //Obtener todos los usuarios
// router.get('/usuarios/:id', getUserId); //Obtener información de un usuario por id
// router.post('/usuarios/', authToken, createUsuarioCRUD); //Registrar un usuario desde administrador
// router.patch('/usuarios/:id', authToken, validateMid(updateSchema), updateUserId); //Para modificar datos de usuario
// router.delete('/usuarios/:id', authToken, deleteUserId); //Eliminar usuario




// //Profile (para obtener info por usuario)
// router.patch('/usuarios/update/:id', authToken, updateUserById); //para editar solo los campos en perfil (nombre, apellidos, correo, telefono, division)
// router.put('/usuarios/update/:id', authToken, validateMid(updatePasswordSchema), updateUserByPassword); //para editar solo la contraseña, para profile y CRUD_users


// export default router;