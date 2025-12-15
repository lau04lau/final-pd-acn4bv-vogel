const express = require("express")
const { body, validationResult } = require("express-validator")
const historialModel = require("../models/historialModel")

const router = express.Router()

const manejarValidacion = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array().map(e => e.msg).join(" | ")
    })
  }
  next()
}

const validacionesHistorial = [
  body("pacienteId").toInt().isInt({ min: 1 }).withMessage("El paciente es obligatorio"),
  body("terapeutaId").toInt().isInt({ min: 1 }).withMessage("El terapeuta es obligatorio"),
  body("fecha").trim().notEmpty().withMessage("La fecha es obligatoria"),
  body("descripcion").trim().notEmpty().withMessage("La descripción es obligatoria"),
  body("tipoRegistro").trim().notEmpty().withMessage("El tipo de registro es obligatorio")
]

router.get("/", (req, res) => {
  historialModel.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: "Error al obtener historiales" })
    res.json(rows)
  })
})

router.post("/", validacionesHistorial, manejarValidacion, (req, res) => {
  const historial = {
    pacienteId: Number(req.body.pacienteId),
    terapeutaId: Number(req.body.terapeutaId),
    fecha: req.body.fecha.trim(),
    descripcion: req.body.descripcion.trim(),
    tipoRegistro: req.body.tipoRegistro.trim()
  }

  historialModel.create(historial, (err, nuevo) => {
    if (err) return res.status(500).json({ error: "Error al guardar historial" })
    res.status(201).json(nuevo)
  })
})

module.exports = router
