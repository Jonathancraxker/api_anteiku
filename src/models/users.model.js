import { pool } from '../config/db.js'
import bcrypt from 'bcryptjs';

//Creacion de usuario en la base de datos
export async function createUsuarios({
    nombre, correo, contrasena, codigo, tipo_usuario, telefono, division}) {
    const connection = await pool.getConnection();
    
    try {
        const passwordHash = await bcrypt.hash(contrasena, 10);

        const [result] = await connection.execute(
            `INSERT INTO usuarios (nombre, correo, contrasena, codigo, tipo_usuario, telefono, division)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nombre, correo, passwordHash, codigo, tipo_usuario, telefono, division]
        );
        return result.insertId;
    } finally {
        connection.release();
    }
}

//Creacion para el CRUD con validacion de tipo_usuario diferente
export async function createUsuariosCRUD({
    nombre, correo, contrasena, codigo, tipo_usuario, telefono, division }) {
    const connection = await pool.getConnection();
    try {
        const passwordHash = await bcrypt.hash(contrasena, 10);
        
        const [result] = await connection.execute(
            `INSERT INTO usuarios (nombre, correo, contrasena, codigo, tipo_usuario, telefono, division)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [ nombre, correo, passwordHash, codigo, tipo_usuario, telefono, division ]
        );

        return result.insertId;
    } finally {
        connection.release();
    }
}

export async function verificarId(userId) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(
            "SELECT * FROM usuarios WHERE id = ?", [userId]);
        return result[0];
    } finally {
        connection.release();
    }
}

//funcion usada para login normal, se valida que el correo si exista en la bd
export async function verificarCorreo(correo) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(
            "SELECT * FROM usuarios WHERE correo = ?", [correo]);
        return result[0];
    } finally {
        connection.release();
    }
}
