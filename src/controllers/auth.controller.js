import { conn } from '../config/db.js';
import bcrypt from 'bcryptjs'
import { crearAccesoToken } from '../libs/jwt.js';

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
        res.json({
            statusCode: 201,
            intOpCode: 0,
            message: "Usuario creado exitosamente",
            data
        });

    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

// login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Buscamos al usuario
        const { data: user, error } = await conn
            .from('usuarios')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) return res.status(401).json({ message: "Credenciales inválidas" });

        // 2. Validamos contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

        // --- 3. OBTENER PERMISOS ---
        
        // 1. Obtenemos nombres de permisos para el mapa
        const { data: todosLosPermisos } = await conn.from('permisos').select('id, nombre');
        const mapa = Object.fromEntries(todosLosPermisos.map(p => [p.id, p.nombre]));

        // 2. Permisos Globales
        const globales = (user.permisos_globales || []).map(id => mapa[id]);

        // 3. Permisos por Grupo (Usando tu tabla: grupo_usuario_permisos)
        const { data: gruposData } = await conn
            .from('grupo_usuario_permisos') // Nombre exacto de tu imagen
            .select('grupo_id, permisos_grupo')
            .eq('usuario_id', user.id);

        const permisosPorGrupo = {};
        (gruposData || []).forEach(g => {
            permisosPorGrupo[g.grupo_id] = (g.permisos_grupo || []).map(id => mapa[id]);
        });

        const listaPermisos = {
            permisos_globales: globales,
            groups: permisosPorGrupo
        };

        //Actualizar último login
        await conn
            .from('usuarios')
            // aqui ajusta la hora que si sea la correcta con now()
            .update({ last_login: new Date().toISOString() })
            .eq('id', user.id);

        // 4. Generar Token
        const token = await crearAccesoToken({
            id: user.id,
            permissions: listaPermisos
        });

        // Guardar token en cookie segura
        res.cookie('token', token, {
            httpOnly: false, // Cambia a true si no necesitas acceso desde JS (recomendado)
            secure: false, // Cambia a true en producción con HTTPS
            sameSite: 'lax', // Para permitir cookies en cross-site (ajusta según tu dominio)
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
        });

        // 5. Formatear respuesta con datos del usuario, token y permisos
        res.status(200).json({
            statusCode: 200,
            intOpCode: 0,
            data: [
                {
                    user: {
                        id: user.id,
                        nombre: user.nombre_completo,
                        email: user.email
                    },
                    token: token,
                    permissions: listaPermisos // Aquí van los permisos cargados de la BD
                }
            ]
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.json({
            statusCode: 200,
            intOpCode: 0,
            message: "Sesión cerrada exitosamente"
        });
}

// auth.controller.js

export const validateUserExists = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: user, error } = await conn
            .from('usuarios')
            .select('id')
            .eq('id', id)
            .single();

        if (error || !user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.status(200).json({ message: "Usuario activo" });
    } catch (error) {
        return res.status(500).json({ error: "Error en la validación" });
    }
};