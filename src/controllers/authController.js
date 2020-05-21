const express = require('express');
const jwt = require('jsonwebtoken');
const bcrpyt = require('bcryptjs');
const multer = require('multer');
const multerUpload = multer(require('../middlewares/multerMiddleware'));
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const { User } = require('../models');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, process.env.APP_KEY, {
        expiresIn: 86400
    });
}

// User Register
router.post('/register', multerUpload.single('image'), async (req, res) => {
    const { name, email, password } = req.body;
    let avatar = null;
    
    try {   
        if (await User.findOne({ where: { email: email } })) {
            return res.status(400).send({ error: 'User already exists' });
        }
        
        if (req.file) {
            const {
                filename: image
            } = req.file;

            await sharp(req.file.path)
                .resize(100)
                .webp({ quality: 60 })
                .toFile(
                    path.resolve(req.file.destination, 'avatars', image)
                );
                
            fs.unlinkSync(req.file.path);
            
            avatar = image;
        }        

        userData = {
            name,
            email,
            password,
            avatar
        };

        const user = await User.create(userData);

        return res.status(201).send({
            user
        });

    } catch (err) {
        return res.status(400).send({
            error: 'Registration failed'
        });
    }

});

// User Login
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