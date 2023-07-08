const express = require('express');
const router = express.Router();
const { startPendulumInstance, startPendulumInstances } = require('../processes/pendulumProcess');

// Parse request bodies as JSON (middleware function)
router.use(express.json());

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

module.exports = router;
