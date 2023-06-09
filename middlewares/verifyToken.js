const jwt = require("jsonwebtoken"); //TODO: Se importa la librería jsonwebtoken para manejar tokens de autenticación.
require("dotenv").config(); //TODO: Se carga la configuración de variables de entorno definidas en el archivo .env.

//! Verifica la validez de un token de autenticación.
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization; //TODO: Se obtiene el token de los encabezados de autorización de la solicitud.
    if(!token) {
        return res.status(404).json({error: "No se proporcionó token"}); //* Si no se proporciona un token, se devuelve un mensaje de error con un código de estado 404.
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({error:"Token invalido"}); //* Si el token es inválido, se devuelve un mensaje de error con un código de estado 401.
        }
        req.user = decoded; //? Si el token es válido, se decodifica su contenido y se agrega al objeto de solicitud (req.user).
        next(); //? Se llama a la función next() para pasar al siguiente middleware.
    });
};