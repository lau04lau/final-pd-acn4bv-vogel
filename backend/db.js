const fs = require("fs")
const path = require("path")
const sqlite3 = require("sqlite3").verbose()

const dataDir = path.join(__dirname, "data")
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir)
}

const dbPath = path.join(dataDir, "database.sqlite")
const db = new sqlite3.Database(dbPath)

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pacientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      dni TEXT NOT NULL UNIQUE,
      telefono TEXT NOT NULL,
      fechaNac TEXT NOT NULL,
      motivoConsulta TEXT,
      nivelEducativo TEXT NOT NULL,
      gradoCurso INTEGER NOT NULL,
      genero TEXT NOT NULL
    )
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS terapeutas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario TEXT NOT NULL UNIQUE,
      contrasenia TEXT NOT NULL
    )
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS historiales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pacienteId INTEGER NOT NULL,
      terapeutaId INTEGER NOT NULL,
      fecha TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      tipoRegistro TEXT NOT NULL,
      FOREIGN KEY (pacienteId) REFERENCES pacientes(id),
      FOREIGN KEY (terapeutaId) REFERENCES terapeutas(id)
    )
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS tipos_registro (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL UNIQUE
    )
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS niveles_educativos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL UNIQUE
    )
  `)
})

module.exports = db
