const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json({ message: 'OK' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
