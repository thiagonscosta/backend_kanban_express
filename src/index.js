const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

// app.use(routes);
require('./controllers/AuthController')(app);
require('./controllers/ColumnController')(app);
require('./controllers/BoardController')(app);

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'avatars')));

app.listen(PORT, function () {
    console.log(`⚡ Server listen on port ${PORT}`);
});