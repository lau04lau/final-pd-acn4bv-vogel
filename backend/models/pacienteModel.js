const db = require("../db")

function getAll(callback) {
  db.all("SELECT * FROM pacientes", [], callback)
}

function getById(id, callback) {
  db.get("SELECT * FROM pacientes WHERE id = ?", [id], callback)
}

function findByDni(dni, callback) {
  db.get("SELECT id FROM pacientes WHERE dni = ?", [dni], callback)
}

function findByDniExcludingId(dni, id, callback) {
  db.get("SELECT id FROM pacientes WHERE dni = ? AND id <> ?", [dni, id], callback)
}

function create(paciente, callback) {
  db.run(
    `
    INSERT INTO pacientes (nombre, apellido, dni, telefono, fechaNac, motivoConsulta, nivelEducativo, gradoCurso, genero)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      paciente.nombre,
      paciente.apellido,
      paciente.dni,
      paciente.telefono,
      paciente.fechaNac,
      paciente.motivoConsulta,
      paciente.nivelEducativo,
      paciente.gradoCurso,
      paciente.genero
    ],
    function (err) {
      if (err) return callback(err)
      callback(null, { id: this.lastID, ...paciente })
    }
  )
}

function update(id, paciente, callback) {
  db.run(
    `
    UPDATE pacientes
    SET nombre = ?, apellido = ?, dni = ?, telefono = ?, fechaNac = ?, motivoConsulta = ?, nivelEducativo = ?, gradoCurso = ?, genero = ?
    WHERE id = ?
  `,
    [
      paciente.nombre,
      paciente.apellido,
      paciente.dni,
      paciente.telefono,
      paciente.fechaNac,
      paciente.motivoConsulta,
      paciente.nivelEducativo,
      paciente.gradoCurso,
      paciente.genero,
      id
    ],
    function (err) {
      if (err) return callback(err)
      callback(null, this.changes)
    }
  )
}

function remove(id, callback) {
  db.run("DELETE FROM pacientes WHERE id = ?", [id], function (err) {
    if (err) return callback(err)
    callback(null, this.changes)
  })
}

module.exports = {
  getAll,
  getById,
  findByDni,
  findByDniExcludingId,
  create,
  update,
  remove
}
