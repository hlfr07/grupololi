const express = require('express');
const app = express();
const path = require('path');

// Configurar middleware para procesar datos del formulario
app.use(express.urlencoded({ extended: true }));
/*----------------------------------------------------------------------------------------------------------------*/
app.use(express.json());
// ACA PONES EL MOTOR O FORMATO DEL HTML QUE VAS A USAR EJS SERIA EL MAS COMUN
app.set('view engine', 'ejs');

// ACA VAS A PONER DE DONDE VA BUSCAR EL HTML O EL EJS MAS DICHO AHI TE DEJO
app.set('views', path.join(__dirname, 'src', 'views'));

// ESTO ES PARA INDICAR DESDE DONDE VAS A LLAMAR LOS LINKS PARA TU HTML : ejmplos -> /src/views/vistaadmin/css/estilos.css -- para llamar css que esta dentro de carpeta vistaadmin , entras usuarios.ejs para que te des cuenta como llamo links como css ejemplo
app.use('/src', express.static('src'))

//PARA PODER AGARRAR DATS DEL FORMULARIO LOGIN
app.use(express.urlencoded({ extended: true }));

// RUTAS EN GENERAL SON ESTO
const rutas = require('./src/routes/rutas');
app.use(rutas);



app.listen(4000, () => {
    console.log('El servidor está corriendo en el puerto 4000 ---> http://localhost:4000/');
});
