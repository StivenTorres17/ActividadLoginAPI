const userModel = require("../models/usersModel"); //TODO: Se importa el modelo userModel desde el archivo userModel.js.
const bcrypt = require("bcryptjs"); //TODO: Se importa la librería bcryptjs.

//! Obtiene todos los usuarios. ||  Endpoint: GET /users
exports.getAllUsers = (req, res) => {
  userModel.find() //? Busca todos los usuarios en la base de datos.
    .then(users => res.json(users)) //* Si se encuentran usuarios, se devuelve un objeto JSON con los usuarios encontrados.
    .catch(err => res.status(500).json({ error: err.message })); //* Si hay un error, se devuelve un mensaje de error y un código de estado 500.
};

//! Obtiene un usuario por su email. || Endpoint: GET /users/:email
exports.getUser = (req, res) => {
  const { email } = req.params; //? Se obtiene el email de los parámetros de la solicitud.
  userModel.findOne({ email }) //? Busca un usuario por su email en la base de datos.
    .then(user => res.json(user)) //* Si se encuentra el usuario, se devuelve un objeto JSON con el usuario encontrado.
    .catch(err => res.status(404).json({ error: err.message })); //* Si no se encuentra el usuario, se devuelve un mensaje de error con un código de estado 404. En caso de error, se devuelve un mensaje de error con un código de estado 500.
};

//! Crea un nuevo usuario. || Endpoint: POST /users/create
exports.createUser = (req, res) => {
  const {
    username,
    email,
    password
  } = req.body; //? Se obtienen los datos del nuevo usuario de los parámetros de la solicitud.
  const saltRounds = 10; //TODO: Número de rondas de sal para generar el hash de la contraseña.
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      res.status(500).json({ error: err.message }); //* Si hay un error al generar el hash de la contraseña, se devuelve un mensaje de error con un código de estado 500.
    } else {
      const newUser = new userModel({
        username,
        email,
        password: hash, //TODO: Se utiliza el hash generado como contraseña en el nuevo usuario.
        picture:""
      });
      newUser
        .save() //? Se guarda el nuevo usuario en la base de datos.
        .then(() => res.status(201).json({ success: "Se creo el usuario exitosamente" })) //* Si se crea el usuario exitosamente, se devuelve un mensaje de éxito con un código de estado 201.
        .catch((err) => res.status(500).json({ error: err.message })); //* Si hay un error al guardar el nuevo usuario, se devuelve un mensaje de error con un código de estado 500.
    }
  });
};


//! Actualiza un usuario existente. || Endpoint: PUT /users/update/:id
exports.updateUser = (req, res) => {
  const { id } = req.params; //? Se obtiene el ID del usuario de los parámetros de la solicitud.
  const { username, email, password } = req.body; //* Se obtienen los datos actualizados del usuario de los parámetros de la solicitud.
  const avatarFileName = req.file ? req.file.filename:null;
  const saltRounds = 10; //TODO: Número de rondas de sal para generar el hash de la contraseña.

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      res.status(500).json({ error: err.message }); //* Si hay un error al generar el hash de la contraseña, se devuelve un mensaje de error con un código de estado 500.
    }
    else {
      userModel.findByIdAndUpdate(id, { username, email, password: hash, picture:avatarFileName }, { new: true })
        .then(user => {
          if (!user) throw new Error(`El usuario con el ID ${id} no existe`); //* Si no se encuentra el usuario, se lanza un error.
          res.status(200).json({ user }); //* Si se actualiza el usuario exitosamente, se devuelve un objeto JSON con el usuario actualizado y un código de estado 200.
        })
        .catch(err => res.status(404).json({ error: err.message })); //* Si hay un error al actualizar el usuario, se devuelve un mensaje de error con un código de estado 404.
    }
  });
};

//! Elimina un usuario existente. || Endpoint: DELETE /users/delete/:id
exports.deleteUser = (req, res) => {
  const { id } = req.params; //? Se obtiene el ID del usuario de los parámetros de la solicitud.
  
  userModel
    .findByIdAndDelete(id) //? Se busca y elimina el usuario correspondiente al ID.
    .then(user => {
      if (!user) throw new Error(`El usuario con el ID ${id} no existe`); //* Si no se encuentra el usuario, se lanza un error.
      res.status(200).json({ message: "Usuario Elimiado" }); //* Si se elimina el usuario exitosamente, se devuelve un objeto JSON con un mensaje de éxito y un código de estado 200.
    })
    .catch((err) => res.status(500).json({ error: err.message })); //* Si hay un error al eliminar el usuario, se devuelve un mensaje de error con un código de estado 500.
};