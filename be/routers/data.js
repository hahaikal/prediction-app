const express = require('express');
const router = express.Router();
const DataUser = require('../app/models/dataUser');
const User = require('../app/models/user');

router.get('/', async (req, res) => {
    try {
        const dataUsers = await DataUser.findAll({
        include: [{
            model: User,
            attributes: ['id']
        }]
        });
        res.status(200).json(dataUsers);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    });

    router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const dataUsers = await DataUser.findAll({
        where: { userId },
        include: [{
            model: User,
            attributes: ['id']
        }]
        });

        if (dataUsers.length === 0) {
        return res.status(404).json({ message: 'No data found for this user' });
        }

        res.status(200).json(dataUsers);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;