import { conn } from '../config/db.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config/db.js';

// Funcion para crear/registrar un nuevo usuario
export const createUser= async (req, res) => {
    const { nombre_completo, username, email, password, direccion, telefono } = req.body;

    try {
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

// login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data: user, error } = await conn
            .from('usuarios')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            return res.status(401).json({ message: "El correo electrónico no está registrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            ACCESS_TOKEN_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
            user: {
                id: user.id,
                nombre: user.nombre_completo,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno al intentar iniciar sesión" });
    }
}
