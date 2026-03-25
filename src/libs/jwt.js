// import jwt from 'jsonwebtoken';

// export function accesoToken(payload, secret, expiresIn) {
//     return new Promise((resolve, reject) => {
//         jwt.sign(
//             payload,
//             secret,
//             {
//                 expiresIn: expiresIn
//             },
//             (err, token) => {
//                 if (err) reject(err);
//                 resolve(token);
//             }
//         );
//     });
// }

import {ACCESS_TOKEN_SECRET} from '../config/db.js'
import jwt from 'jsonwebtoken';

export function accesoToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { id: payload.id, tipo_usuario: payload.tipo_usuario},
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1d", //tiempo de expiración, se puede poner min, hora o días.
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}