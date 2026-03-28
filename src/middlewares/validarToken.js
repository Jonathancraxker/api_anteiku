import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config/db.js';

//Middlware para validar que exista un token de jwt
export const authToken = (req, res, next) => { 
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Verifica el token en las cookies o localstorage

    if (!token) {
        return res.status(403).json({ message: "Token no proporcionado" });
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
        }
        req.user = user; // Guardamos el payload (id, permisos, etc.) en req.user para usarlo en los controladores
        next();
    });
};

// import jwt from "jsonwebtoken";
// import { ACCESS_TOKEN_SECRET } from "../config/db.js";

// export const validarToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1]; // Formato "Bearer TOKEN"

//     if (!token) return res.status(401).json({ message: "No hay token, autorización denegada" });

//     jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ message: "Token no válido" });
        
//         req.user = user; // Aquí guardamos el id y permisos que pusimos en el payload
//         next();
//     });
// };