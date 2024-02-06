const pool = require("../../database/conexion");
const bcrypt=require("bcryptjs");


const obtenerUsuarios = async (req, res) => {
    try {
        const [usuarios] = await pool.promise().query('SELECT * FROM usuarios');
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const idUsuario = req.params.id;
        const [usuario] = await pool.promise().query('SELECT * FROM usuarios WHERE id = ?', [idUsuario]);

        if (usuario.length > 0) {
            res.json(usuario[0]);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const estado=1;
        const passwordEncryptado = await bcrypt.hash(password, 10);
        const [result] = await pool.promise().query('INSERT INTO usuarios (nombre, email, password, estado) VALUES (?, ?, ?, ?)', [nombre, email, passwordEncryptado, estado]);
        res.json({ id: result.insertId, nombre, email, password, estado });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const idUsuario = req.params.id;
        const { nombre, email, password } = req.body;
        const estado=1;
        const [result] = await pool.promise().query('UPDATE usuarios SET nombre = ?, email = ?, password = ?, estado = ? WHERE id = ?', [nombre, email, password, estado, idUsuario]);

        if (result.affectedRows > 0) {
            res.json({ id: idUsuario, nombre, email, password, estado });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado o no se realizó ninguna actualización' });
        }
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const idUsuario = req.params.id;
        const [result] = await pool.promise().query('DELETE FROM usuarios WHERE id = ?', [idUsuario]);

        if (result.affectedRows > 0) {
            res.json({ mensaje: 'Usuario eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario };
