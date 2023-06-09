const bcrypt = require('bcryptjs'); //TODO: Se importa la librería bcryptjs.

const saltRounds = 10; //* Número de rondas de sal para generar el hash.
const plainPassword = 'password123'; //* Contraseña en texto plano.

bcrypt.hash(plainPassword, saltRounds, function (error, hash) {
    if (error) {
        console.log(error); //* Si ocurre un error, se muestra en la consola.
    } else {
        console.log('Se creó el hash de la contraseña:', hash); // Se muestra en la consola el hash de la contraseña generada.
    }
});

const hashedPassword = '$2b$10$'; //TODO: Contraseña con hash previamente generada.
const loginPassword = 'password123'; //TODO: Contraseña para iniciar sesión.

bcrypt.compare(loginPassword, hashedPassword, function (error, result) {
    if (error) {
        console.log(error); //* Si ocurre un error, se muestra en la consola.
    } else if (result) {
        console.log('La contraseña es válida'); //* Si la contraseña coincide, se muestra en la consola.
    } else {
        console.log('La contraseña no es válida'); //* Si la contraseña no coincide, se muestra en la consola.
    }
});