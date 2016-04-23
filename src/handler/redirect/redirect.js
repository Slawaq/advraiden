'use strict';

module.exports = (to, subid) => 
  `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="0;${to}?id=${subid ? subid : ''}">
      </head>
      <body>
        <script>
            document.location.href = "${to.replace(/\//g,'\\/')}?id=${subid ? subid : ''}";
        </script>
      </body>
    </html>
  `;