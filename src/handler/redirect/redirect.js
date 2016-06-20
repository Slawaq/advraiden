'use strict'

module.exports = (to) => 
  `
  <!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="refresh" content="0;${to}">
    </head>
    <body>
      <script>
          document.location.href = "${to}";
      </script>
    </body>
  </html>`
