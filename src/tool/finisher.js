'use strict'

module.exports = (req, res) => {
  if (!res.finished)
    res.end()
}
