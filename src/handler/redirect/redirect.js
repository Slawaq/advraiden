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
            document.location.href = "${to.replace(/\//g,'\\/')}${to.indexOf('?') === -1 ? '?' : '&'}id=${subid ? subid : ''}";
        </script>
      </body>
    </html>
  `;