// Server Model: Contiene todo el servidor de express + socket.io configurado
const Server = require('./models/Server');

// Paquete para leer y establecer las variables de entorno
require('dotenv').config();


// Inicializar la instancia del server
const server = new Server(process.env.PORT);

// Ejecutar el server
server.execute();


