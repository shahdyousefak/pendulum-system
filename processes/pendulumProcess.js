/**
 * Module for simulating and updating pendulum data.
 * Handles the creation of pendulum instances, updating their data based on physics calculations, and serving the updated data over HTTP.
 * @module pendulumProcess
 */

const http = require('http');
const fetch = require('cross-fetch');

/**
 * Object to map pendulum instances to their corresponding port numbers.
 * @type {Object}
 */
let pendulumMapping = {}


/**
 * Updates the pendulum data based on the elapsed time and the current pendulum instance.
 * @param {number} dt - The elapsed time in seconds.
 * @param {object} pendulum - The pendulum instance to update.
 */
function updatePendulumData(dt, pendulum) {
    // Calculate the angular acceleration
    const g = 9.81; // Acceleration due to gravity (m/s^2)
    const angularAcceleration = g / pendulum.length * Math.sin(pendulum.angle);

    // Update angular velocity
    pendulum.angularVelocity += angularAcceleration * dt;
    pendulum.angle = 360 - ((360 - pendulum.angle + pendulum.angularVelocity * dt * 180 / Math.PI) % 360);

    const adjustedAngle = 360 - pendulum.angle; // Adjust the angle
    const angleInRadians = adjustedAngle * Math.PI / 180;
    // Update x and y
    pendulum.x = pendulum.start_x + pendulum.length * Math.cos(angleInRadians);
    pendulum.y = pendulum.start_y - pendulum.length * Math.sin(angleInRadians);
    console.log("Updated PENDULUM DATA:", pendulum);
}

/**
 * Starts a pendulum instance on the specified port.
 * @param {object} pendulum - The pendulum instance to start.
 * @param {number} port - The port number to run the pendulum instance on.
 */
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

/**
 * Starts multiple pendulum instances based on the provided array of pendulum data.
 * Each pendulum instance runs on a unique port.
 * @param {Array} pendulumArrays - An array of pendulum data objects.
 */
function startPendulumInstances(pendulumArrays) {
  const basePort = 3000;

  pendulumArrays.forEach((pendulumArray, i) => {
    const port = basePort + i;
    startPendulumInstance(pendulumArray, port);
  });
}

module.exports = { startPendulumInstances, updatePendulumData };
