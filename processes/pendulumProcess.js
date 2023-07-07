const net = require('net');

// Function to start a pendulum instance on a specific TCP port
function startPendulumInstance(pendulums) {
  const basePort = 3000; // Starting TCP port number

  pendulums.forEach((pendulum, index) => {
    const port = basePort + index + 1;

    // Create a TCP server
    const server = net.createServer();

    // handle incoming client connections
    server.on('connection', socket => {
      // handle data received from the client
      socket.on('data', data => {
        // hmm
        console.log(`Received data from client on port ${port}: ${data}`);
      });

      // handle client connection close
      socket.on('close', () => {
        console.log(`Client disconnected from port ${port}`);
      });
    });

    // Start the server and listen on the specified port
    server.listen(port, () => {
      console.log(`Pendulum instance running on port ${port}`);
      console.log('Pendulum:', pendulum);
    });
  });
}

module.exports = { startPendulumInstance };
