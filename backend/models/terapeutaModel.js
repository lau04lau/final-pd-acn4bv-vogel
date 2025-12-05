const db = require("../db")

function getAllPublic(callback) {
  db.all("SELECT id, usuario FROM terapeutas", [], callback)
}

function getByUsuario(usuario, callback) {
  db.get("SELECT * FROM terapeutas WHERE usuario = ?", [usuario], callback)
}

function create(usuario, hash, callback) {
  db.run(
    "INSERT INTO terapeutas (usuario, contrasenia) VALUES (?, ?)",
    [usuario, hash],
    function (err) {
      if (err) return callback(err)
      callback(null, { id: this.lastID, usuario })
    }
  )
}

function update(id, usuario, hash, callback) {
  db.run(
    "UPDATE terapeutas SET usuario = ?, contrasenia = ? WHERE id = ?",
    [usuario, hash, id],
    function (err) {
      if (err) return callback(err)
      callback(null, this.changes)
    }
  )
}

function remove(id, callback) {
  db.run("DELETE FROM terapeutas WHERE id = ?", [id], function (err) {
    if (err) return callback(err)
    callback(null, this.changes)
  })
}

module.exports = {
  getAllPublic,
  getByUsuario,
  create,
  update,
  remove
}
