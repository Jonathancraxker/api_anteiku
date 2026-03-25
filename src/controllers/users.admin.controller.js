import { conn } from '../config/db.js';
import bcrypt from 'bcryptjs'

// Funciones para consultar a todos los usuarios y a un usuario en especifico

export const getUsers = async (req, res) => {
    const { data, error } = await conn.from('usuarios').select('*');
    if (error) {
        return res.status(400).json({ error: error.message });
    } else {
        return res.status(200).json(data);
    }
}

export const getUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const { data } = await conn.from('usuarios').select('*').eq('id', id);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
        res.status(400).json({ message: error.message });
    }
}

// Función para crear un usuario nuevo
export const createUserCrud = async (req, res) => {
    const { nombre_completo, username, email, password, direccion, telefono } = req.body;

    try {
        // Validación de email y username
        const { data: existingUser } = await conn
            .from('usuarios')
            .select('id')
            .or(`email.eq.${email},username.eq.${username}`)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: "El email o username ya están en uso" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data, error } = await conn
            .from('usuarios')
            .insert([{
                nombre_completo,
                username,
                email,
                password: hashedPassword,
                direccion,
                telefono
            }])
            .select();

        if (error) return res.status(400).json({ error: error.message });

        res.status(201).json({ message: "Usuario creado exitosamente", user: data[0] });

    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

// Función para actualizar un usuario por ID
export const updateUserId = async (req, res) => {
    const { id } = req.params;
    const { nombre_completo, username, email, direccion, telefono } = req.body;

    try {
        const { data, error, count } = await conn
            .from('usuarios')
            .update({
                nombre_completo,
                username,
                email,
                direccion,
                telefono
            })
            .eq('id', id)
            .select(); // Para que 'data' contenga el usuario actualizado

        if (error) {
            if (error.code === '23505') {
                return res.status(409).json({ error: "El email o username ya están en uso por otro usuario." });
            }
            throw error;
        }

        if (count === 0 || data.length === 0) {
            return res.status(404).json({ message: `No se encontró el usuario` });
        }

        res.status(200).json({ 
            message: "Usuario actualizado exitosamente", 
            user: data[0] 
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Función para actualizar la contraseña de un usuario por ID
export const updatePassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data, error, count } = await conn
            .from('usuarios')
            .update({ password: hashedPassword })
            .eq('id', id)
            .select();

        if (error) return res.status(400).json({ error: error.message });

        if (count === 0 || !data || data.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Contraseña actualizada correctamente" });

    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la contraseña" });
    }
};

// Función para eliminar un usuario por ID
export const deleteUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const { error, count } = await conn
            .from('usuarios')
            .delete({ count: 'exact' }) 
            .eq('id', id);

        if (error) throw error;
        if (count === 0) {
            return res.status(404).json({ 
                message: `No se encontró el usuario` 
            });
        }

        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}