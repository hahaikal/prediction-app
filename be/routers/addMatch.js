const express = require('express');
const router = express.Router();
const DataUser = require('../app/models/dataUser');
const User = require('../app/models/user');

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
        scoreHome,
        scoreAway,
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
        scoreHome,
        scoreAway,
        winnerByOdd,
        note
        });

        res.status(201).json({ message: 'Match data added successfully', match: newMatch });
    } catch (error) {
        console.error('Error adding match data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const match = await DataUser.findByPk(id);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        Object.keys(updates).forEach(key => {
            match[key] = updates[key];
        });

        await match.save();

        res.status(200).json({ message: 'Match data updated successfully', match });
    } catch (error) {
        console.error('Error updating match data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;