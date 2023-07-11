const express = require('express');
const router = express.Router();
const { startPendulumInstances, getPendulumPositions } = require('../processes/pendulumProcess');

let lastPendulumParams = [];

// Parse request bodies as JSON (middleware function)
router.use(express.json());


// endpoint to start 5 pendulum instances 
router.post('/pendulums', (req, res) => {
  const pendulums = req.body.pendulumData;
    
    // call the startPendulumInstances function and pass pendulum arrays
    startPendulumInstances(pendulums);
    console.log(pendulums);

  res.status(201).json({ message: 'Pendulum data created successfully' });
});


// GET endpoint to retrieve the current positions of the pendulums
router.get('/pendulumPositions', (req, res) => {
  const positions = getPendulumPositions();
  res.status(200).json(positions);
});

  
  module.exports = router;