const express = require("express")
const bcrypt = require("bcrypt")
const { body, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const db = require("./db")
const terapeutaModel = require("./models/terapeutaModel")

const pacientesRoutes = require("./routes/pacientes")
const terapeutasRoutes = require("./routes/terapeutas")
const historialesRoutes = require("./routes/historiales")

const app = express()
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET || "2tW5Hk8jRzM9pG7f"

const manejarValidacion = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors
        .array()
        .map(e => e.msg)
        .join(" | ")
    })
  }
  next()
}

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) {
    return res.status(401).json({ error: "Token requerido" })
  }
  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido o expirado" })
    }
    req.usuario = usuario
    next()
  })
}

const soloAdmin = (req, res, next) => {
  if (!req.usuario || !req.usuario.esAdmin) {
    return res.status(403).json({ error: "Acceso solo para administradores" })
  }
  next()
}

const validacionesTipoRegistro = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del tipo de registro es obligatorio")
]

const validacionesNivelEducativo = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del nivel educativo es obligatorio")
]

const validacionesLogin = [
  body("usuario")
    .trim()
    .notEmpty()
    .withMessage("El usuario es obligatorio"),
  body("contrasenia")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
]

app.use("/pacientes", autenticarToken, pacientesRoutes)
app.use("/historiales", autenticarToken, historialesRoutes)
app.use("/terapeutas", autenticarToken, soloAdmin, terapeutasRoutes)

app.post(
  "/login-terapeuta",
  validacionesLogin,
  manejarValidacion,
  (req, res) => {
    const usuario = req.body.usuario.trim()
    const contrasenia = req.body.contrasenia.trim()
    terapeutaModel.getByUsuario(usuario, (err, row) => {
      if (err) return res.status(500).json({ error: "Error al iniciar sesión" })
      if (!row) return res.status(401).json({ error: "Usuario o contraseña incorrectos" })
      const coincide = bcrypt.compareSync(contrasenia, row.contrasenia)
      if (!coincide) return res.status(401).json({ error: "Usuario o contraseña incorrectos" })
      const esAdmin = row.esAdmin === 1
      const token = jwt.sign(
        { id: row.id, usuario: row.usuario, esAdmin },
        JWT_SECRET,
        { expiresIn: "8h" }
      )
      res.json({
        ok: true,
        token,
        terapeuta: { id: row.id, usuario: row.usuario, esAdmin }
      })
    })
  }
)

app.get("/tipos-registro", autenticarToken, (req, res) => {
  db.all("SELECT * FROM tipos_registro", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Error al obtener tipos de registro" })
    res.json(rows)
  })
})

app.post(
  "/tipos-registro",
  autenticarToken,
  validacionesTipoRegistro,
  manejarValidacion,
  (req, res) => {
    const nombre = req.body.nombre.trim()
    db.run(
      "INSERT INTO tipos_registro (nombre) VALUES (?)",
      [nombre],
      function (err) {
        if (err) {
          if (err.code === "SQLITE_CONSTRAINT") {
            return res.status(400).json({ error: "El tipo de registro ya existe" })
          }
          return res.status(500).json({ error: "Error al guardar tipo de registro" })
        }
        res.status(201).json({ id: this.lastID, nombre })
      }
    )
  }
)

app.get("/niveles-educativos", autenticarToken, (req, res) => {
  db.all("SELECT * FROM niveles_educativos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Error al obtener niveles educativos" })
    res.json(rows)
  })
})

app.post(
  "/niveles-educativos",
  autenticarToken,
  validacionesNivelEducativo,
  manejarValidacion,
  (req, res) => {
    const nombre = req.body.nombre.trim()
    db.run(
      "INSERT INTO niveles_educativos (nombre) VALUES (?)",
      [nombre],
      function (err) {
        if (err) {
          if (err.code === "SQLITE_CONSTRAINT") {
            return res.status(400).json({ error: "El nivel educativo ya existe" })
          }
          return res.status(500).json({ error: "Error al guardar nivel educativo" })
        }
        res.status(201).json({ id: this.lastID, nombre })
      }
    )
  }
)

const inicializarTerapeutaAdmin = () => {
  db.run(
    "ALTER TABLE terapeutas ADD COLUMN es_admin INTEGER NOT NULL DEFAULT 0",
    err => {
      if (err && !String(err.message || "").includes("duplicate column name")) {
        console.error("Error al agregar columna es_admin en terapeutas:", err.message)
      }
      db.get("SELECT COUNT(*) as total FROM terapeutas", [], (err2, row) => {
        if (err2) {
          console.error("Error al contar terapeutas:", err2.message)
          return
        }
        if (row && row.total === 0) {
          const hash = bcrypt.hashSync("4545", 10)
          db.run(
            "INSERT INTO terapeutas (usuario, contrasenia, es_admin) VALUES (?, ?, 1)",
            ["laura861", hash],
            err3 => {
              if (err3) {
                console.error("Error al crear terapeuta admin inicial:", err3.message)
              } else {
                console.log("Terapeuta administrador inicial creado: usuario laura861")
              }
            }
          )
        }
      })
    }
  )
}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
  inicializarTerapeutaAdmin()
})
