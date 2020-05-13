const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        // if (await User.findOne({ where: { email: email }})) {
        //     return res.status(400).send({ error: 'User already exists' });
        // }

        const data = req.body;

        const user = await User.create({ name: data.name, email: data.email, password: data.password });

        return res.status(201).send({ data });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

module.exports = app => app.use('/auth', router);