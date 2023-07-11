// pendulumProcess.js
const net = require('net');
const fetch = require('cross-fetch');

let pendulumData = [];
let pendulumMapping = {}

// This function updates the pendulum data using the Euler method
function updatePendulumData(dt, pendulum) {
  const g = 9.81; // Acceleration due to gravity
 
    const angularAcceleration = -g / pendulum.length * pendulum.angle;
    pendulum.angularVelocity += angularAcceleration * dt;
    pendulum.angle += pendulum.angularVelocity * dt;
    console.log("Updated PENDULUM DATA:", pendulum);
}

// This function returns the current x and y positions of the pendulums
function getPendulumPositions() {
  console.log('pendulum data', pendulumData)
  return pendulumData.map(pendulum => {
    return {
      x: pendulum.length * Math.sin(pendulum.angle),
      y: pendulum.length * Math.cos(pendulum.angle)
    };
  });
}

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
    console.log('Connection established');
    console.log(pendulumMapping[port]);
    const dt = 0.1;
    updatePendulumData(dt, pendulumMapping[port])
    // socket.on('data', (data) => {
    //   console.log(`Received data from client on port ${port}: ${data}`);
      
    //   // Decode Buffer into a string and parse it into an array of numbers
    //   const pendulumParams = JSON.parse(data);
    //   console.log('Parsed pendulum parameters:', pendulumParams);

    //   // Update the pendulumData array with the received parameters
    //   pendulumData = pendulumParams.map(([length, mass, angle]) => {
    //     return {
    //       length: length / 100, // Convert cm to m
    //       mass: mass / 1000, // Convert g to kg
    //       angle: angle * (Math.PI / 180), // Convert degrees to radians
    //       angularVelocity: 0, // Initial angular velocity is zero
    //     };
    //   });

    //   console.log('Updated pendulum data after receiving parameters:', pendulumData);

    //   // Add a periodic update of pendulum data.
    //   const dt = 0.01; // Timestep in seconds. Adjust based on your requirements.
    //   setInterval(() => updatePendulumData(dt), dt * 1000); // Convert dt to milliseconds for setInterval.
    // });

    socket.on('close', () => {
      console.log(`Client disconnected from port ${port}`);
    });
  });

  server.listen(port, () => {
    console.log(`Pendulum instance running on port ${port}`);
    console.log('Pendulum:', pendulum);
    pendulumMapping[port] = pendulum
  });
}

function startPendulumInstances(pendulumArrays) {
// Stops any running pendulum instances
//stopPendulumInstances();
  const basePort = 3000;

  pendulumArrays.forEach((pendulumArray, i) => {
    const port = basePort + i;
    startPendulumInstance(pendulumArray, port);
  });
}

// function stopPendulumInstances() {
//     console.log("Stopping all pendulum instances...");

//     pendulumProcesses.forEach((pendulumProcess, index) => {
//         if(pendulumProcess) {
//             pendulumProcess.kill();
//             console.log(`Pendulum process ${index} killed`);
//         }
//     });

//     pendulumProcesses = [];
//     console.log("All pendulum instances stopped");
// }


module.exports = { startPendulumInstances, updatePendulumData, getPendulumPositions };
