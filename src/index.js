const express = require('express');
const pool = require('../database/conexion');
const router = require('../src/router/route');
const app = express();
const cors = require('cors');


// Aplicar el middleware CORS a todas las rutas
app.use(cors());
// Configurar middleware para procesar datos del formulario
app.use(express.urlencoded({ extended: true }));
/*----------------------------------------------------------------------------------------------------------------*/
app.use(express.json());




// PRUEBA DE LA CONEXION A LA BASE DE DATOS MYSQL
pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    } else {
        console.log('Conexión a la base de datos de MySQL con éxito!');
    }
});

app.use(router);

//starting the server
app.listen(4000, () => {
    console.log('El servidor corriendo en el puerto 3000 ---> http://localhost:4000/')
});