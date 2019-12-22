const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: 'http://localhost:8080',
  }));
}

app.use('/api', apiRoutes);
app.listen(port, () => console.log(`Running on port ${port}`));

module.exports = app;
