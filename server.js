const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the "css" directory
app.use('/css', express.static(path.join(__dirname, 'css')));

// Serve static files from the "js" directory
app.use('/js', express.static(path.join(__dirname, 'js')));

// Serve the index.html file as the default page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Parse request bodies as JSON
app.use(express.json());

app.post('/api/pendulum', (req, res) => {
  const pendulums = [
    req.body.pendulum1,
    req.body.pendulum2,
    req.body.pendulum3,
    req.body.pendulum4,
    req.body.pendulum5
  ];

  // Process the pendulum data as needed
  console.log(pendulums);

  // Send a response back to the client
  res.json({ message: 'Pendulum data submitted successfully' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
