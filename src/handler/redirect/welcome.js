'use strict'

const { contact } = require('../../../config.json')

const htmlWelcome = `
<!DOCTYPE html>
<html>
    <head>
        <style type="text/css">
            body { width: 100%; margin: 0; float: none; }
            body { background: white; }
            body { color: #111; }
            body { font-family: sans-serif; }
            a:link { cursor: pointer; text-decoration: underline; color: #06c; }
            p { font-size: 12pt; } 
        </style>
    </head>
    <body>
        <center>
            <p>For all cooperation questions please contact: 
                <a href="mailto:${contact}">${contact}</a>
            </p>
        </center>
    </body>
</html>
`

module.exports = (state, req, res) => res.write(htmlWelcome)
