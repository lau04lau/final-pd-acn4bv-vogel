const express = require("express")
const bcrypt = require("bcrypt")
const { body, validationResult } = require("express-validator")
const terapeutaModel = require("../models/terapeutaModel")

const router = express.Router()

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

const validacionesTerapeuta = [
  body("usuario")
    .trim()
    .notEmpty()
    .withMessage("El usuario no debe estar vacío"),
  body("contrasenia")
    .trim()
    .isLength({ min: 4 })
    .withMessage("La contraseña debe tener al menos 4 caracteres")
]

router.get("/", (req, res) => {
  terapeutaModel.getAllPublic((err, rows) => {
    if (err) return res.status(500).json({ error: "Error al obtener terapeutas" })
    res.json(rows)
  })
})

router.post(
  "/",
  validacionesTerapeuta,
  manejarValidacion,
  (req, res) => {
    const usuario = req.body.usuario.trim()
    const contrasenia = req.body.contrasenia.trim()
    const esAdmin = !!req.body.esAdmin
    const hash = bcrypt.hashSync(contrasenia, 10)

    terapeutaModel.create(usuario, hash, esAdmin, (err, nuevo) => {
      if (err) {
        if (err.code === "SQLITE_CONSTRAINT") {
          return res.status(400).json({ error: "El usuario ya está registrado" })
        }
        return res.status(500).json({ error: "Error al guardar terapeuta" })
      }
      res.status(201).json(nuevo)
    })
  }
)

router.put(
  "/:id",
  validacionesTerapeuta,
  manejarValidacion,
  (req, res) => {
    const id = Number(req.params.id)
    const usuario = req.body.usuario.trim()
    const contrasenia = req.body.contrasenia.trim()
    const esAdmin = !!req.body.esAdmin
    const hash = bcrypt.hashSync(contrasenia, 10)

    terapeutaModel.update(id, usuario, hash, esAdmin, (err, changes) => {
      if (err) {
        if (err.code === "SQLITE_CONSTRAINT") {
          return res.status(400).json({ error: "El usuario ya está registrado" })
        }
        return res.status(500).json({ error: "Error al actualizar terapeuta" })
      }
      if (changes === 0) return res.status(404).json({ error: "Terapeuta no encontrado" })
      res.json({ id, usuario, esAdmin })
    })
  }
)

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id)
  terapeutaModel.remove(id, (err, changes) => {
    if (err) return res.status(500).json({ error: "Error al eliminar terapeuta" })
    if (changes === 0) return res.status(404).json({ error: "Terapeuta no encontrado" })
    res.json({ ok: true })
  })
})

module.exports = router
