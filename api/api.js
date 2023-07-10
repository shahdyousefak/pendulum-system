const express = require('express');
const router = express.Router();
const { startPendulumInstances } = require('../processes/pendulumProcess');

let lastPendulumParams = [];

// Parse request bodies as JSON (middleware function)
router.use(express.json());


// endpoint to start 5 pendulum instances 
router.post('/pendulums', (req, res) => {
  const pendulums = [
    req.body.pendulum1,
    req.body.pendulum2,
    req.body.pendulum3,
    req.body.pendulum4,
    req.body.pendulum5
  ];
    // call the startPendulumInstances function and pass pendulum arrays
    startPendulumInstances(pendulums);
    console.log(pendulums);

  res.status(201).json({ message: 'Pendulum data created successfully' });
});

  
  module.exports = router;