// pendulumProcess.js
const http = require('http');
const fetch = require('cross-fetch');

let pendulumData = [];
let pendulumMapping = {}


function updatePendulumData(dt, pendulum) {
    const g = 9.81; // Acceleration due to gravity
    let angleInRadians = pendulum.angle * Math.PI / 180;
  
    // Angular acceleration derived from the formula: -(g / L) * sin(theta)
    const angularAcceleration = -g / pendulum.length * Math.sin(angleInRadians);
  
    // Update angular velocity
    pendulum.angularVelocity += angularAcceleration * dt;
  
    // Update the pendulum's angle
    pendulum.angle += pendulum.angularVelocity * dt * 180 / Math.PI;
  
    // Normalize angle to be between -180 and 180
    if (pendulum.angle > 180) {
      pendulum.angle -= 360;
    } else if (pendulum.angle < -180) {
      pendulum.angle += 360;
    }
  
    // Convert updated angle back to radians for calculating x and y
    angleInRadians = pendulum.angle * Math.PI / 180;
  
    // Update x and y
    pendulum.x = pendulum.start_x + pendulum.length * Math.sin(angleInRadians);
    pendulum.y = pendulum.start_y - pendulum.length * Math.cos(angleInRadians); // Adjusted y calculation due to angle from horizontal
  
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
