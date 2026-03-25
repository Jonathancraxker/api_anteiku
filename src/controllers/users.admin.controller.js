import { conn } from '../config/db.js';

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
        const { data } = await conn.from('usuarios').insert({
            nombre_completo,
            username,
            email,
            password,
            direccion,
            telefono
        });
        res.status(201).json({ message: "Usuario creado exitosamente", data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

    //Funcion para actualizar un usuario por ID
export const updateUserId = async (req, res) => {
    const { id } = req.params;
    const { nombre_completo, username, email, password, direccion, telefono } = req.body;

    try {
        const { data } = await conn.from('usuarios').update({
            nombre_completo,
            username,
            email,
            password,
            direccion,
            telefono
        })
        .eq('id', id);

        res.status(200).json({ message: "Usuario actualizado exitosamente", data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Función para eliminar un usuario por ID
export const deleteUserId = async (req, res) => {
    const { id } = req.params;
    
    try {
        const { data } = await conn.from('usuarios').delete().eq('id', id);
        res.status(200).json({ message: "Usuario eliminado exitosamente", data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}