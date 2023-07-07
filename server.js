const express = require('express');
const path = require('path');
const apiRouter = require('./api/api');

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

app.use('/api', apiRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
