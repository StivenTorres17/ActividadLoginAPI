const express = require("express"); //TODO: Se importa la librería express.
const router = express.Router(); //TODO: Se crea un enrutador utilizando el método Router de express.
const authControllers = require("../controllers/authControllers"); //TODO: Se importa el controlador authController desde el archivo authController.js.

//? importar el userController
const usersControllers = require('../controllers/usersControllers');

router.get('/:email', usersControllers.getUser); //? Ruta para obtener un usuario por su email.
router.get('/', usersControllers.getAllUsers); //? Ruta para obtener todos los usuarios.
router.post('/create', usersControllers.createUser); //? Ruta para crear un usuario.
router.put('/update/:id', usersControllers.updateUser); //? Ruta para actualizar un usuario por su ID.
router.delete('/delete/:id', usersControllers.deleteUser); //? Ruta para eliminar un usuario por su ID.
router.post('/login', authControllers.authenticateUser); //? Ruta para autenticar un usuario.

module.exports = router; //* Se exporta el enrutador para que pueda ser utilizado en otros archivos.