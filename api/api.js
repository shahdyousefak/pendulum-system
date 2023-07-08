const express = require('express');
const router = express.Router();
const { startPendulumInstance, startPendulumInstances } = require('../processes/pendulumProcess');

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
    // call the startPendulumInstances function and pass pendulumArrays
    startPendulumInstances(pendulums);
    console.log(pendulums);

  res.status(201).json({ message: 'Pendulum data created successfully' });
});

// endpoint to retrieve the last set of pendulum parameters
router.get('/pendulums/last-params', (req, res) => {
    const lastParams = getLastPendulumParams();
  
    res.status(200).json({ pendulumParams: lastParams });
  });

module.exports = router;
