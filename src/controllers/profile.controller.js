import { conn } from "../config/db.js";
import bcrypt from "bcryptjs";

export const getProfile = async (req, res) => {
    console.log("Datos del usuario del token:", req.user); // Para que veas que sí llega
    try {
        // Obtenemos el ID directamente del token (req.user que puso el middleware)
        const { data: user, error } = await conn
            .from('usuarios')
            .select('id, nombre_completo, username, email, direccion, telefono, creado_en')
            .eq('id', req.user.id)
            .single();

        if (error) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json({
            statusCode: 200,
            intOpCode: 0,
            data: [user]
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    const { nombre_completo, username, email, password, direccion, telefono } = req.body;
    try {

        const updateData = { nombre_completo, username, email, direccion, telefono };

        // Si se envió una nueva contraseña, la hasheamos, sino no la incluimos en el update
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }

        const { data, error } = await conn
            .from('usuarios')
            .update(updateData)
            .eq('id', req.user.id)
            .select();

        if (error) {
            if (error.code === '23505') {
                return res.status(409).json({ error: "El email o username ya está en uso por otro usuario." });
            }
            throw error;
        }

        res.json({
            statusCode: 200,
            intOpCode: 0,
            data: [{ message: "Perfil actualizado exitosamente" },
            data[0]]
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar" });
    }
};

// Para actualizar solo la contraseña desde el usuario logeado
export const updateProfilePassword = async (req, res) => {
    const { password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const { data, error } = await conn
            .from('usuarios')
            .update({ password: hashedPassword })
            .eq('id', req.user.id)
            .select();

        if (error) return res.status(400).json({ error: error.message });

        res.json({
            statusCode: 200,
            intOpCode: 0,
            message: "Contraseña actualizada exitosamente"
        });

    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la contraseña" });
    }
};


export const deleteProfile = async (req, res) => {
    try {
        const { error } = await conn
            .from('usuarios')
            .delete()
            .eq('id', req.user.id);
        
        if (error) throw error;

        res.json({
            statusCode: 200,
            intOpCode: 0,
            data: [{ message: "Perfil eliminado exitosamente" }]
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el perfil" });
    }
}