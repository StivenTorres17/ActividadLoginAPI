const mongoose = require("mongoose"); //TODO: Se importa la librería mongoose para la conexión con la base de datos.

//! Establece la conexión con la base de datos.

//*CODIGO DE CLASE:
// exports.dbConnection = () => {
//     try {
//         mongoose.set("strictQuery", false); // Configura la opción "strictQuery" de mongoose en falso.
//         mongoose.connect(process.env.DB_CONNECTION); // Intenta establecer la conexión con la base de datos utilizando la URL especificada en la variable de entorno DB_CONNECTION.
//         console.log("Se conectó con la base de datos"); // Muestra un mensaje en la consola indicando que se ha conectado con la base de datos.
//     } catch (err) {
//         console.log("Error de conexión con la base de datos", err); // Si hay un error al conectar con la base de datos, muestra un mensaje de error en la consola.
//     }
// };

//*CODIGO DE CineBit:
exports.dbConnection = async () => {
  try {
    //? Establece la conexión con la base de datos utilizando los parámetros de conexión y opciones proporcionados.
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,         //TODO: Habilita el nuevo analizador de URL para evitar advertencias.
      useUnifiedTopology: true,      //TODO: Utiliza el nuevo motor de topología unificada para evitar advertencias.
      useCreateIndex: true,          //TODO: Crea automáticamente índices para modelos Mongoose para evitar advertencias.
    });

    //* Imprime un mensaje indicando que la conexión con la base de datos se ha establecido correctamente.
    console.log("Se ha establecido la conexión con la base de datos");
  } catch (err) {
    //* En caso de error al conectar con la base de datos, muestra un mensaje de error detallado.
    console.error("Error al conectar con la base de datos:", err);

    //? Finaliza la ejecución del programa en caso de error de conexión para evitar continuar con una conexión inválida.
    process.exit(1);
  }
};

  /**
 *? Diferencias respecto al código original:
 * * - Se utilizó async/await para hacer la conexión de manera más legible y manejar las promesas de forma más eficiente.
 * * - Se agregaron opciones adicionales al método mongoose.connect para evitar advertencias y utilizar las últimas funcionalidades de MongoDB.
 * * - Se cambió console.log a console.error para mostrar mensajes de error en lugar de mensajes de información.
 * * - Se agregó process.exit(1) en caso de error de conexión para finalizar la ejecución del programa.
 * 
 *TODO: Razón de los cambios:
 * * - El uso de async/await simplifica la gestión de promesas y hace el código más legible.
 * * - Las opciones adicionales en mongoose.connect mejoran la configuración y evitan advertencias obsoletas.
 * * - Mostrar mensajes de error con console.error es más adecuado para indicar problemas.
 * * - Finalizar la ejecución del programa en caso de error evita continuar con una conexión inválida.
 * 
 * !Conclusión:
 * 
 * * El código de CineBit mejora el manejo de errores y la configuración de la conexión con la base de datos. 
 * * El uso de async/await simplifica la gestión de promesas y hace el código más legible. 
 * * Las opciones adicionales en mongoose.connect mejoran la configuración y evitan advertencias obsoletas. 
 * * Mostrar mensajes de error con console.error es más adecuado para indicar problemas. 
 * * Además, finalizar la ejecución del programa en caso de error evita continuar con una conexión inválida y permite tomar medidas apropiadas. 
 * * En general, el segundo código es más robusto, legible y adecuado para establecer la conexión con la base de datos de manera segura y eficiente.
*/ 