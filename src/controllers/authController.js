const express = require('express');
const jwt = require('jsonwebtoken');
const bcrpyt = require('bcryptjs');

const parser = require('../config/cloudinary');

const { User } = require('../models');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, process.env.APP_SECRET, {
        expiresIn: 86400
    });
}

router.post('/register', parser.single('image'), async (req, res) => {
    const { name, email, password } = req.body;

    const avatarUrl = null;

    if (req.file) {
        avatarUrl = req.file.url;
    }

    try {   

        if (await User.findOne({ where: { email: email }} )) {
            return res.status(400).send({ error: 'User already exists' });
        }

        userData = {
            name,
            email,
            password,
            avatarUrl
        };

        const user = await User.create(userData);

        return res.status(201).send({ user });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email: email,
        }
    });

    if (!user) {
        return res.send({ error: 'User not found' });
    }

    if (!await bcrpyt.compare(password, user.password)) {
        return res.send({
            error: 'Invalid password'
        });
    }

    const token = generateToken({
        id: user.id
    });

    user.password = undefined;

    return res.send({ user, token });
});

module.exports = app => app.use('/auth', router);