
const jwt = require("jsonwebtoken");
const pool = require("../../database/conexion");
const bcrypt=require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Busca el usuario en la base de datos por nombre de usuario
    pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
      async (error, results) => {
        console.log(results);
        if (error) {
          console.error("Error en el servidor:", error);
          res.status(500).json({ message: "Error en el inicio de sesión" });
        } else if (results.length === 0) {
          // El usuario no existe
          res.status(400).json({ message: "no se encontro el usaurio" });
        } else if (results[0].estado === 0) {
          // El usuario no existe
          res.status(400).json({ message: "el usuario no esta activo" });
        } else {
          console.log(results);
          // Compara la contraseña proporcionada con la almacenada en la base de datos
          const resultadodetablausuario = results[0];
          const contrasenaValida = await bcrypt.compare(password, resultadodetablausuario.password);
          if (contrasenaValida) {
            const payload = {
              id: results[0].id,
              nombre: results[0].nombre,
              email: results[0].email,
              estado: results[0].estado,
            };
            const token= jwt.sign(payload,"luis", {expiresIn:"30m"})
            res.status(200).json({ token });
          } else {
            res.status(400).json({ message: "passwordincorrecto" });
          }
        }
      }
    );
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error en el inicio de sesión" });
  }
};

module.exports = { login };
