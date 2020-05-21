const express = require('express');
const router = express.Router();

const { Column } = require('../models');

router.post('/add_column', async (req, res) => {

    try {
        const {
            title
        } = req.body;

        const col = req.body;

        const column = await Column.create({ title: title });

        res.status(201).send({
            column
        });

    } catch (err) {
        return res.status(400).send({
            error: err
        });
    }
});

module.exports = app => app.use('/columns', router);
