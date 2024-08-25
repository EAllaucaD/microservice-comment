const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { eventId, comment } = req.body;
    // Implement comment logic here
    res.json({ message: 'Comment added successfully' });
});

module.exports = router;
