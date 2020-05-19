const express = require('express');
const router = express.Router();
 
const { Column } = require('../models/column');

router.post('/columns', async (req, res) => {
    
    try {
        const {
            title
        } = req.body;

        const column = await Column.create({
            title
        });

        res.status(201).send({
            column
        });

    } catch (err) {
        return res.status(400).send({ error: err });
    }
});

router.get('/index', async (req, res) => {
    
});

module.exports = app => app.use('/auth', router);

