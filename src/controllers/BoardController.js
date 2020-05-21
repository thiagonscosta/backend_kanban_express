const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { Column, Task } = require('../models');

router.use(authMiddleware);

router.get('/', async (req, res) => {

    const id = req.userId;

    try {
        const colums = await Column.findAll();

        const tasks = await Task.findAll({ where: { userId: id }});

        res.status(200).send({tasks, colums});

    } catch (err) {
        return res.status(400).send({ error: 'Error loading tasks' });
    }

});

router.post('/add_task', async (req, res) => {
    
});


module.exports = app => app.use('/board', router)

