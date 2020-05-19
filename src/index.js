const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

// app.use(routes);
require('./controllers/authController')(app);

app.listen(PORT, function () {
    console.log(`⚡ Server listen on port ${PORT}`);
});