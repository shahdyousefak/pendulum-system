// pendulumProcess.js
const http = require('http');
const fetch = require('cross-fetch');

let pendulumData = [];
let pendulumMapping = {}


// This function updates the pendulum data using the Euler method
function updatePendulumData(dt, pendulum) {
  const g = 9.81; // Acceleration due to gravity
 
    const angularAcceleration = -g / pendulum.length * pendulum.angle;

    pendulum.angularVelocity += angularAcceleration * dt;
    pendulum.angle += pendulum.angularVelocity * dt;
    pendulum.x =  pendulum.length * Math.sin(pendulum.angle),
    pendulum.y =  pendulum.length * Math.cos(pendulum.angle)
    console.log("Updated PENDULUM DATA:", pendulum);
}

// This function returns the current x and y positions of the pendulums
function getPendulumPositions() {
  console.log('pendulum data', pendulumData)
  return pendulumData.map(pendulum => {
    return {
     
    };
  });
}

function startPendulumInstance(pendulum, port) {
  const server = http.createServer(function (req, res) {   //create web server
    if (req.url == '/') { //check the URL of the current request
        
        console.log('Connection established');
        console.log(pendulumMapping[port]);
        const dt = 0.1;
        updatePendulumData(dt, pendulumMapping[port])
        res.writeHead(200, { 
            'Content-Type': 'text/json', 
            'Access-Control-Allow-Origin': '*'}); 
        
        // set response content    
        res.write(JSON.stringify(pendulumMapping[port]));
        res.end();
    
    }
  })

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Retrying with the next available port.`);
      startPendulumInstance(pendulum, port + 1);
    } else {
      console.error(`An error occurred while starting the server on port ${port}: ${error}`);
    }
  });

  server.listen(port, () => {
    console.log(`Pendulum instance running on port ${port}`);
    pendulum.angularVelocity = 0; // Initialize angular velocity to zero
    console.log('Pendulum:', pendulum);
    pendulumMapping[port] = pendulum;
  });
}

function startPendulumInstances(pendulumArrays) {
  const basePort = 3000;

  pendulumArrays.forEach((pendulumArray, i) => {
    const port = basePort + i;
    startPendulumInstance(pendulumArray, port);
  });
}

module.exports = { startPendulumInstances, updatePendulumData, getPendulumPositions };
