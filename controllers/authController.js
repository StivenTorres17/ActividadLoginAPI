const bcrypt = require("bcryptjs"); //TODO: Se importa la librería bcryptjs para el hashing de contraseñas.
const usersModel = require("../models/usersModel"); //TODO: Se importa el modelo usersModel desde el archivo usersModel.js.
const jwt = require("jsonwebtoken"); //TODO: Se importa la librería jsonwebtoken para la generación de tokens.

const secret = process.env.JWT_SECRET;
const encodedSecret = Buffer.from(secret).toString("base64");

require("dotenv").config(); //? Se carga la configuración del entorno.

exports.authenticateUser = (req, res) => {
    const { email, password } = req.body; //* Se extraen el email y la contraseña de la solicitud.

    usersModel
        .findOne({ email }) //? Se busca un usuario por su email en el modelo usersModel.
        .then((user) => {
            if (!user) {
                //* Si no se encuentra el usuario, se devuelve un mensaje de error.
                return res.status(404).json({ error: "El ususario no existe" });
            }

            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else if (result) {
                    const payload = {
                        userId: user._id,
                        email: user.email,
                        role: user.role
                    };
                    //* Si la contraseña coincide, el usuario se autentica exitosamente.

                    //? Generar un token de autenticación con el payload y una clave secreta
                    const token = jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        { expiresIn: "1h" } //TODO: El token expira después de 1 hora
                    );

                    //* Devolver una respuesta exitosa con el mensaje y el token generado
                    res.status(200).json({ message: "La autentificación ha sido existosa", token });
                } else {
                    //* Si la contraseña no coincide, se devuelve un mensaje de error.
                    res.status(401).json({ error: "Hubo una falla en la autentificación" });
                }
            });
        })
        .catch((err) => res.status(500).json({ error: err.message }));
};