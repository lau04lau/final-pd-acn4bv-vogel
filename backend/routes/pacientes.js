const express = require("express")
const { body, validationResult } = require("express-validator")
const pacienteModel = require("../models/pacienteModel")

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

const validacionesPaciente = [
  body("nombre").trim().notEmpty(),
  body("apellido").trim().notEmpty(),
  body("dni").trim().isLength({ min: 8 }),
  body("telefono").trim().notEmpty(),
  body("fechaNac").trim().notEmpty().isISO8601(),
  body("nivelEducativo").trim().notEmpty(),
  body("gradoCurso").toInt().isInt({ min: 1, max: 7 }),
  body("genero").trim().notEmpty()
]

const validarDniUnicoCrear = (req, res, next) => {
  const dni = (req.body.dni || "").trim()
  pacienteModel.findByDni(dni, (err, row) => {
    if (err) return res.status(500).json({ error: "Error al validar paciente" })
    if (row) return res.status(400).json({ error: "El DNI ya se encuentra registrado" })
    next()
  })
}

const validarDniUnicoEditar = (req, res, next) => {
  const dni = (req.body.dni || "").trim()
  const idEditar = Number(req.params.id)
  pacienteModel.findByDniExcludingId(dni, idEditar, (err, row) => {
    if (err) return res.status(500).json({ error: "Error al validar paciente" })
    if (row) return res.status(400).json({ error: "El DNI ya se encuentra registrado" })
    next()
  })
}

router.get("/", (req, res) => {
  pacienteModel.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: "Error al obtener pacientes" })
    res.json(rows)
  })
})

router.get("/:id", (req, res) => {
  const id = Number(req.params.id)
  pacienteModel.getById(id, (err, row) => {
    if (err) return res.status(500).json({ error: "Error al obtener paciente" })
    if (!row) return res.status(404).json({ error: "Paciente no encontrado" })
    res.json(row)
  })
})

router.post(
  "/",
  validacionesPaciente,
  manejarValidacion,
  validarDniUnicoCrear,
  (req, res) => {
    const paciente = {
      nombre: req.body.nombre.trim(),
      apellido: req.body.apellido.trim(),
      dni: req.body.dni.trim(),
      telefono: req.body.telefono.trim(),
      fechaNac: req.body.fechaNac.trim(),
      motivoConsulta: (req.body.motivoConsulta || "").trim(),
      nivelEducativo: req.body.nivelEducativo.trim(),
      gradoCurso: Number(req.body.gradoCurso),
      genero: req.body.genero.trim()
    }
    pacienteModel.create(paciente, (err, nuevo) => {
      if (err) return res.status(500).json({ error: "Error al guardar paciente" })
      res.status(201).json(nuevo)
    })
  }
)

router.put(
  "/:id",
  validacionesPaciente,
  manejarValidacion,
  validarDniUnicoEditar,
  (req, res) => {
    const id = Number(req.params.id)
    const paciente = {
      nombre: req.body.nombre.trim(),
      apellido: req.body.apellido.trim(),
      dni: req.body.dni.trim(),
      telefono: req.body.telefono.trim(),
      fechaNac: req.body.fechaNac.trim(),
      motivoConsulta: (req.body.motivoConsulta || "").trim(),
      nivelEducativo: req.body.nivelEducativo.trim(),
      gradoCurso: Number(req.body.gradoCurso),
      genero: req.body.genero.trim()
    }
    pacienteModel.update(id, paciente, (err, changes) => {
      if (err) return res.status(500).json({ error: "Error al actualizar paciente" })
      if (changes === 0) return res.status(404).json({ error: "Paciente no encontrado" })
      res.json({ id, ...paciente })
    })
  }
)

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id)
  pacienteModel.remove(id, (err, changes) => {
    if (err) return res.status(500).json({ error: "Error al eliminar paciente" })
    if (changes === 0) return res.status(404).json({ error: "Paciente no encontrado" })
    res.json({ ok: true })
  })
})

module.exports = router
