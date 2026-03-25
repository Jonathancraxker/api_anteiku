import z from 'zod'

export const registroSchema = z.object({
    nombre_completo: z.string ({
        required_error: 'El nombre completo es requerido'
    }).nonempty('El nombre completo no puede estar vacio'),
    username: z.string ({
        required_error: 'El username es requerido'
    }).nonempty('El username no puede estar vacio'),
    email: z.string ({
        required_error: 'El email es requerido'
    }).nonempty('El email no puede estar vacio')
    .email({
        message: 'email no valido'
    }),
    password: z.string({
        required_error:'La contraseña es requerida'
    }).min(3,{
        message:'La contraseña debe tener minimo 3 caracteres'
    }),
    direccion: z.string ({
        required_error: 'La direccion es requerida'
    }).nonempty('La direccion no puede estar vacia'),
    telefono: z.string ({
        required_error: 'El telefono es requerido'
    }).nonempty('El telefono no puede estar vacio')
    .min(10, {
        message: 'El telefono debe tener al menos 10 caracteres'
    })
    .max(10, {
        message: 'El telefono debe tener un maximo de 10 caracteres'
    })
})


export const loginSchema = z.object({
    email: z.string ({
        required_error: 'El email es requerido'
    }).nonempty('El email no puede estar vacio')
    .email({
        message: 'email no valido'
    }),
    password: z.string({
        required_error:'La contraseña es requerida'
    }).min(3,{
        message:'La contraseña debe tener minimo 3 caracteres'
    }).nonempty('La contraseña no puede estar vacía')
})


export const updateSchema = z.object({
    nombre_completo: z.string ({
        required_error: 'El nombre completo es requerido'
    }).nonempty('El nombre completo no puede estar vacio'),
    username: z.string ({
        required_error: 'El username es requerido'
    }).nonempty('El username no puede estar vacio'),
    email: z.string ({
        required_error: 'El email es requerido'
    }).nonempty('El email no puede estar vacio')
    .email({
        message: 'email no valido'
    }),
})

export const updatePasswordSchema = z.object({
    password: z.string({
        required_error:'La contraseña es requerida'
    }).min(3,{
        message:'La contraseña debe tener minimo 3 caracteres'
    })
})