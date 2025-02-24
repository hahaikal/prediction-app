const express = require('express');
const router = express.Router();
const DataUser = require('../models/dataUser');
const User = require('../models/user');

router.post('/', async (req, res) => {
    const {
        userId,
        date,
        league,
        home,
        away,
        handicapHome,
        handicapAway,
        oddHome1,
        oddAway1,
        oddHome2,
        oddAway2,
        totalVotesHome,
        totalVotesDraw,
        totalVotesAway,
        winnerByOdd,
        note
    } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
        return res.status(400).json({ message: 'User not found' });
        }

        const newMatch = await DataUser.create({
        userId,
        date,
        league,
        home,
        away,
        handicapHome,
        handicapAway,
        oddHome1,
        oddAway1,
        oddHome2,
        oddAway2,
        totalVotesHome,
        totalVotesDraw,
        totalVotesAway,
        winnerByOdd,
        note
        });

        res.status(201).json({ message: 'Match data added successfully', match: newMatch });
    } catch (error) {
        console.error('Error adding match data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;