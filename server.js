const express = require('express');
const port = process.env.PORT || 3000

app = express()
const http = require('http').createServer(app)
module.exports = {app, http};

require('./helpers/socket.io')

//Start listening
http.listen(port,() => {
    console.log(`Server running at port `+ port);
  });