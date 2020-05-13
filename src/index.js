const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

require('./controllers/authController')(app);

app.listen(PORT, function () {
    console.log(`⚡ Server listen on port ${PORT}`);
});