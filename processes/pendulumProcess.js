// pendulumProcess.js
const http = require('http');
const fetch = require('cross-fetch');

let pendulumData = [];
let pendulumMapping = {}

function updatePendulumData(dt, pendulum) {
    // Calculate the angular acceleration
    const g = 9.81; // Acceleration due to gravity (m/s^2)
    const angularAcceleration = -g / pendulum.length * Math.sin(pendulum.angle);
    
    // Update the angular velocity and the angle
    pendulum.angularVelocity += angularAcceleration * dt;
    pendulum.angle += pendulum.angularVelocity * dt;
    
    // Keep the angle between 0 and 2π
    pendulum.angle = pendulum.angle % (2 * Math.PI);
    if (pendulum.angle < 0) {
        pendulum.angle += 2 * Math.PI;
    }
    
    // Calculate the new position of the pendulum bob
    pendulum.x = pendulum.start_x + pendulum.length * Math.sin(pendulum.angle);
    pendulum.y = pendulum.start_y - pendulum.length * Math.cos(pendulum.angle);

    console.log("Updated PENDULUM DATA:", pendulum);
}


  function clampAngle(angle) {
    while (angle > 180) {
      angle -= 360;
    }
    while (angle < -180) {
      angle += 360;
    }
    return angle;
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

module.exports = { startPendulumInstances, updatePendulumData };
