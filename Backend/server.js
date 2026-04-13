const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// 📁 Crear directorio uploads si no existe
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// 📁 servir imágenes
app.use('/uploads', express.static('uploads'));

// ========================
// CONFIG MULTER
// ========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + path.extname(file.originalname);
    cb(null, nombreUnico);
  }
});

const upload = multer({ storage });

// ========================
// CONEXIÓN BD
// ========================
const db = new Pool({
  host: '127.0.0.1',
  user: 'postgres',
  password: '1111',
  database: 'GoDoggy',
  port: 5432
});


db.connect()
  .then(() => console.log('Conectado a PostgreSQL 🚀'))
  .catch(err => console.error('Error de conexión:', err));

// ========================
// GET USUARIOS
// ========================
app.get('/usuarios', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "usuario"');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// ========================
// REGISTRO USUARIO (CON FOTO)
// ========================
app.post('/registro', upload.single('foto'), async (req, res) => {
  console.log("📨 Petición de registro recibida");
  const { nombre, telefono, email, password } = req.body;
  const foto = req.file ? req.file.filename : null;

  console.log("📥 Datos recibidos:", { nombre, telefono, email, password: password ? "****" : null });
  console.log("📷 Foto:", foto ? `uploads/${foto}` : "Sin foto");

  if (!nombre || !telefono || !email || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO "usuario" 
      (nombre_completo, telefono, email, contrasena, url_foto_perfil)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING usuario_id
    `;

    const result = await db.query(sql, [
      nombre,
      telefono,
      email,
      hashedPassword,
      foto
    ]);

    res.json({
      mensaje: "Usuario creado",
      id: result.rows[0].usuario_id
    });

  } catch (err) {
    console.error("❌ Error en registro:", err);

    if (err.code === '23505') {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    res.status(500).json({ message: "Error en servidor" });
  }
});


// ========================
// LOGIN USUARIO
// ========================
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log("📥 Login recibido:", req.body);

  try {
    const result = await db.query(
      'SELECT * FROM "usuario" WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const usuario = result.rows[0];

    const passwordValido = await bcrypt.compare(password, usuario.contrasena);

    if (!passwordValido) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    res.json({
      message: "Login exitoso",
      usuario
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en servidor" });
  }
});

// ========================
// FUNCIÓN GENERAR ID MASCOTA
// ========================
function generarIdMascota(nombreDueno, nombreMascota, fecha) {
  const inicialesDueno = nombreDueno
    .split(" ")
    .map(p => p[0])
    .join("")
    .toUpperCase();

  const inicialesMascota = nombreMascota
    .split(" ")
    .map(p => p[0])
    .join("")
    .toUpperCase();

  const fechaFormateada = fecha.replaceAll("-", "");
  const random = Math.floor(1000 + Math.random() * 9000);

  return `${inicialesDueno}_${inicialesMascota}_${fechaFormateada}_${random}`;
}

// ========================
// GET MASCOTAS POR USUARIO
// ========================
app.get('/mascotas/:usuario_id', async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const result = await db.query('SELECT * FROM mascota WHERE usuario_id = $1', [usuario_id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// ========================
// REGISTRO MASCOTA
// ========================


app.post('/mascota', upload.single('foto'), async (req, res) => {
  console.log("🐶 Registro mascota recibido");
  console.log("📥 req.body mascota:", req.body);
  console.log("📷 req.file mascota:", req.file);


  const {
    nombreMascota,
    raza,
    color,
    sexo,
    fechaNacimiento,
    peso,
    esterilizado,
    miedos,
    alergias,
    patas,
    notasExtra,
    usuario_id
  } = req.body;

  const foto = req.file ? req.file.filename : null;

  console.log("URL foto:", foto);
  if (req.file) console.log("Archivo subido en:", req.file.path);

  try {

     const testDB = await db.query("SELECT current_database()");
    console.log("📦 DB actual:", testDB.rows);

    const count = await db.query("SELECT COUNT(*) FROM mascota");
    console.log("🐶 TOTAL MASCOTAS:", count.rows);

    if (!nombreMascota || !raza || !color || !sexo || !fechaNacimiento || !peso || !usuario_id) {
      return res.status(400).json({ message: "Datos incompletos mascota" });
    }

    const fechaFormateada = new Date(fechaNacimiento)
      .toISOString()
      .split("T")[0];

    const esEsterilizado = esterilizado;

    const sql = `
      INSERT INTO mascota (
        usuario_id,
        nombre,
        raza,
        color,
        sexo,
        fecha_nacimiento,
        peso_kg,
        esterilizado,
        miedos,
        alergias,
        num_patas,
        notas_comportamiento,
        url_foto
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING mascota_id
    `;

    const result = await db.query(sql, [
      Number(usuario_id),
      nombreMascota,
      raza,
      color,
      sexo,
      fechaFormateada,
      Number(peso),
      esEsterilizado,
      miedos,
      alergias,
      Number(patas),
      notasExtra,
      foto
    ]);

    res.json({
      message: "Mascota registrada",
      mascota_id: result.rows[0].mascota_id
    });

  } catch (error) {
    console.error("❌ Error mascota completo:", error);
   res.status(500).json({
    message: "Error al guardar mascota",
    error: error.message,
    detalle: error.detail,        // 🔥 PostgreSQL detalle real
    columna: error.column,        // 🔥 columna exacta
    constraint: error.constraint, // 🔥 restricción (NOT NULL, FK, etc)
    tipo: error.code              // 🔥 código de error SQL
    });
  }
});
// ========================
// GET MASCOTAS POR USUARIO
// ========================
app.get('/mascotas/:usuario_id', async (req, res) => {
  const { usuario_id } = req.params;

  console.log("📥 Endpoint mascotas llamado");

  try {
    const result = await db.query(
      'SELECT * FROM mascota WHERE usuario_id = $1',
      [usuario_id]
    );

    console.log("🐶 Mascotas encontradas:", result.rows);

    res.json(result.rows);

  } catch (error) {
    console.error("❌ Error obteniendo mascotas:", error);
    res.status(500).json({ message: "Error al obtener mascotas" });
  }
});

// ========================
// ELIMINAR MASCOTA
// ========================
app.delete('/mascota/:mascota_id', async (req, res) => {
  const { mascota_id } = req.params;

  console.log("🗑️ Eliminando mascota ID:", mascota_id);

  try {
    const result = await db.query(
      'DELETE FROM mascota WHERE mascota_id = $1 RETURNING *',
      [Number(mascota_id)] // 🔥 CORRECCIÓN AQUÍ
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    console.log("🐶 Mascota eliminada:", result.rows[0]);
    res.json({ message: "Mascota eliminada exitosamente" });

  } catch (error) {
    console.error("❌ Error eliminando mascota:", error);
    res.status(500).json({ message: "Error al eliminar mascota" });
  }
});










app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});
