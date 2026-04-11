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
    })
    .min(3,{
        message:'La contraseña debe tener minimo 3 caracteres'
    })
    // Al menos una minuscula, una mayuscula, un numero
    .regex(/[A-Z]/, { message: 'La contraseña debe tener al menos una mayúscula' })
    // Al menos una minúscula
    .regex(/[a-z]/, { message: 'La contraseña debe tener al menos una minúscula' })
    // Al menos un número
    .regex(/[0-9]/, { message: 'La contraseña debe tener al menos un número' })
    // Al menos un caracter especial
    .regex(/[@#$!%*?&]/, { message: 'La contraseña debe tener al menos un caracter especial (@#$!%*?&)' }),
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

// Para crear usuario en CRUD de admin, sin direccion ni telefono
export const createUserCrudSchema = z.object({
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
    })
    .min(3,{
        message:'La contraseña debe tener minimo 3 caracteres'
    })
    // Al menos una minuscula, una mayuscula, un numero
    .regex(/[A-Z]/, { message: 'La contraseña debe tener al menos una mayúscula' })
    // Al menos una minúscula
    .regex(/[a-z]/, { message: 'La contraseña debe tener al menos una minúscula' })
    // Al menos un número
    .regex(/[0-9]/, { message: 'La contraseña debe tener al menos un número' })
    // Al menos un caracter especial
    .regex(/[@#$!%*?&]/, { message: 'La contraseña debe tener al menos un caracter especial (@#$!%*?&)' })
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
    // Al menos una minuscula, una mayuscula, un numero
    .regex(/[A-Z]/, { message: 'La contraseña debe tener al menos una mayúscula' })
    // Al menos una minúscula
    .regex(/[a-z]/, { message: 'La contraseña debe tener al menos una minúscula' })
    // Al menos un número
    .regex(/[0-9]/, { message: 'La contraseña debe tener al menos un número' })
    // Al menos un caracter especial
    .regex(/[@#$!%*?&]/, { message: 'La contraseña debe tener al menos un caracter especial (@#$!%*?&)' })
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
    // Al menos una minuscula, una mayuscula, un numero
    .regex(/[A-Z]/, { message: 'La contraseña debe tener al menos una mayúscula' })
    // Al menos una minúscula
    .regex(/[a-z]/, { message: 'La contraseña debe tener al menos una minúscula' })
    // Al menos un número
    .regex(/[0-9]/, { message: 'La contraseña debe tener al menos un número' })
    // Al menos un caracter especial
    .regex(/[@#$!%*?&]/, { message: 'La contraseña debe tener al menos un caracter especial (@#$!%*?&)' })
})

export const updateProfileSchema = z.object({
    nombre_completo: z.string().optional(),
    username: z.string().nonempty('El username no puede estar vacio').optional(),
    email: z.string ({
        required_error: 'El email es requerido'
    }).nonempty('El email no puede estar vacio')
    .email({
        message: 'email no valido'
    }),
    //quiero que la contraseña sea opcional, pero si se envía, que cumpla con las validaciones
    password: z.string().min(10,{
        message:'La contraseña debe tener minimo 10 caracteres'
    })
    // Al menos una minuscula, una mayuscula, un numero
    .regex(/[A-Z]/, { message: 'La contraseña debe tener al menos una mayúscula' })
    // Al menos una minúscula
    .regex(/[a-z]/, { message: 'La contraseña debe tener al menos una minúscula' })
    // Al menos un número
    .regex(/[0-9]/, { message: 'La contraseña debe tener al menos un número' })
    // Al menos un caracter especial
    .regex(/[@#$!%*?&]/, { message: 'La contraseña debe tener al menos un caracter especial (@#$!%*?&)' })
    .optional()
    .or(z.literal('')),
    direccion: z.string().optional(),
    telefono: z.string().optional()
})