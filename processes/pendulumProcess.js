const net = require('net');

// Function starts a single pendulum instance on a single tcp port
function startPendulumInstance(pendulum, port, i) {

    console.log(pendulum, port-3000, "test")
  const server = net.createServer();

  // Handle error event when the port is already in use
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Retrying with the next available port.`);
      startPendulumInstance(pendulum, port + 1); // Retry with the next port
    } else {
      console.error(`An error occurred while starting the server on port ${port}: ${error}`);
    }
  });

  server.on('connection', socket => {
    socket.on('data', data => {
      console.log(`Received data from client on port ${port}: ${data}`);
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


//Function that takes the array of pendulums as param from the api 
function startPendulumInstances(pendulumArrays) {
  const basePort = 3000; // Starting TCP port number

  //for each pendulum instance, calculate the corresponding port number
  pendulumArrays.forEach((pendulumArray, i) => {
    console.log("THIS IS THE ARRAY", pendulumArray)
    const port = basePort + i; 
    startPendulumInstance(pendulumArray, port);
  });
}

module.exports = { startPendulumInstances };
