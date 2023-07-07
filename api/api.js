const express = require('express');
const router = express.Router();

// Parse request bodies as JSON (middleware function)
router.use(express.json());

router.post('/pendulum', (req, res) => {
  const pendulums = [
    req.body.pendulum1,
    req.body.pendulum2,
    req.body.pendulum3,
    req.body.pendulum4,
    req.body.pendulum5
  ];

  console.log(pendulums);

  // Send a response back to the client
  res.json({ message: 'Pendulum data submitted successfully' });
});

module.exports = router;
