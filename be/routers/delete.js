const express = require('express');
const router = express.Router();
const DataUser = require('../app/models/dataUser');

router.delete('/:matchId', async (req, res) => {
    const { matchId } = req.params;

    try {
        const deletedMatch = await DataUser.destroy({
            where: { id: matchId }
        });

        if (!deletedMatch) {
            return res.status(404).json({ message: 'Match not found' });
        }

        res.status(200).json({ message: 'Match deleted successfully' });
    } catch (error) {
        console.error('Error deleting match:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
