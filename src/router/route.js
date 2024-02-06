const express = require("express");
const { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario } = require("../controllers/regiusu");
const { login } = require("../controllers/login");
const { verificatoken } = require("../security/token");

const router = express.Router();

router.get("/usuarios", verificatoken ,obtenerUsuarios);
router.get("/usuarios/:id", obtenerUsuarioPorId);
router.post("/usuarios",crearUsuario);
router.put("/usuarios/:id", actualizarUsuario);
router.delete("/usuarios/:id",eliminarUsuario);
router.post("/login",login)

module.exports=router;