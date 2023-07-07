const express = require('express');
const path = require('path');
const apiRouter = require('./api/api');
const { startPendulumInstances } = require('./processes/pendulumProcess.js');

//const { fork } = require('child_process');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/css', express.static(path.join(__dirname, 'css')));

app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', apiRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
