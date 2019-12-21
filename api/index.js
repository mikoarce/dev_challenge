const express = require('express');
const apiRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', apiRoutes);
app.listen(port, () => console.log(`Running on port ${port}`));

module.exports = app;
