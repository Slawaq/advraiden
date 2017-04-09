'use strict'

const { contact } = require('../../../config.json')

const htmlWelcome = `
<html>
    <body>
        <center>For further information, please contact to <a href="mailto:${contact}">${contact}</a></center>
    </body>
</html>
`

module.exports = (state, req, res) => res.write(htmlWelcome)
