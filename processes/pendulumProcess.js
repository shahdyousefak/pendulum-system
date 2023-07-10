// pendulumProcess.js
const net = require('net');
const fetch = require('cross-fetch');

let pendulumPositions = [];

function startPendulumInstance(pendulum, port) {
  const server = net.createServer();

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Retrying with the next available port.`);
      startPendulumInstance(pendulum, port + 1);
    } else {
      console.error(`An error occurred while starting the server on port ${port}: ${error}`);
    }
  });

  server.on('connection', (socket) => {
    socket.on('data', (data) => {
      console.log(`Received data from client on port ${port}: ${data}`);
      
      // Decode Buffer into a string and parse it into an array of numbers
      const pendulumParams = data.toString().split(',').map(Number);
      console.log(pendulumParams);

    });

    socket.on('close', () => {
      console.log(`Client disconnected from port ${port}`);
    });
  });

  server.listen(port, () => {
    console.log(`Pendulum instance running on port ${port}`);
    console.log('Pendulum:', pendulum);
  });
}

function startPendulumInstances(pendulumArrays) {
  const basePort = 3000;

  pendulumArrays.forEach((pendulumArray, i) => {
    const port = basePort + i;
    startPendulumInstance(pendulumArray, port);
  });
}


module.exports = { startPendulumInstances };
