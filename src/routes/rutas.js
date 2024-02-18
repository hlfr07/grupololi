const express = require("express");
const { vistaadmin } = require("../controllers/vistaadmincontrollers");
const { vistaperfil } = require("../controllers/vistaperfilcontrollers");
const enviarGMAIL = require("../controllers/enviargmail");
const { vistatoken } = require("../controllers/tokenadmincontrollers");
const { vistaempleado } = require("../controllers/vistaempleadocontrollers");
const { vistahotel } = require("../controllers/vistahotelcontrollers");
const { vistasucursal } = require("../controllers/vistasucursalcontrollers");
const { vistapisos } = require("../controllers/vistapisoscontrollers");
const { vistacategoria } = require("../controllers/vistacategoriacontrollers");
const { vistacliente } = require("../controllers/vistaclientecontrollers");
const { vistatipohabitacion } = require("../controllers/vistatipohabitacionecontrollers");
const { vistahabitacion } = require("../controllers/vistahabitacioncontrollers");
const { vistamantenimiento } = require("../controllers/vistamantenimientocontrollers");
const { vistaproveedor } = require("../controllers/vistaproveedorcontrollers");
const { vistacompra } = require("../controllers/vistacompracontrollers");
const { vistaproducto } = require("../controllers/vistaproductocontrollers");
const { vistadetallecompra } = require("../controllers/vistadetallecompracontrollers");
const { vistareserva } = require("../controllers/vistareservacontrollers");
const { vistadetallereserva } = require("../controllers/vistadetallereservacontrollers");
const { vistaunidad } = require("../controllers/vistaunidadcontrollers");



const router = express.Router();

 


  //VISTA DEL ADMIN DESPUES LOGEADO
  router.get("/",vistaadmin)
router.get("/perfil",vistaperfil)
router.get("/token",vistatoken)
router.get("/empleado",vistaempleado)
router.get("/hotel",vistahotel)
router.get("/piso",vistapisos)
router.get("/categoria",vistacategoria)
router.get("/cliente",vistacliente)
router.get("/sucursal",vistasucursal)
router.get("/habitacion",vistahabitacion)
router.get("/mantenimiento",vistamantenimiento)
router.get("/proveedor",vistaproveedor)
router.get("/compra",vistacompra)
router.get("/producto",vistaproducto)
router.get("/detallecompra",vistadetallecompra)
router.get("/reserva",vistareserva)
router.get("/detallereserva",vistadetallereserva)
router.get("/unidad",vistaunidad)

router.get("/tipohabitacion",vistatipohabitacion)
router.post("/obtenertoken",enviarGMAIL)
module.exports = router