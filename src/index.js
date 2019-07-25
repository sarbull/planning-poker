const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
let server = null;

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'));

let start = () => {
  server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
};

let stop = () => {
  server.close();
};

module.exports = {
  start: start,
  stop: stop,
  getInstance: () => app,
  getServer: () => server
};