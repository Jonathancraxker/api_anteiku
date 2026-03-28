import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config/db.js';

export function crearAccesoToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload, // Pasamos todo el objeto (id, permisos, etc.)
            ACCESS_TOKEN_SECRET,
            { expiresIn: "30d" },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}