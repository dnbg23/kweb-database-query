const express = require('express');
const app = express();

// Updated users object with uid-style keys
const users = {
    '22': { name: 'Beauregard', totalFare: 127600 },
    '23': { name: 'Jessica', totalFare: 156000 },
    '24': { name: 'Minjae', totalFare: 89000 },
    '36': {name: 'Lola', totalFare: 33500}
};

// Fixed trains object with unique keys
const trains = {
    train1: { bookedSeats: 100, maxSeats: 100 },
    train2: { bookedSeats: 60, maxSeats: 120 },
    train3: { bookedSeats: 30, maxSeats: 30 }
};

// GET /fare route
app.get('/fare', (req, res) => {
    try {
        const uid = req.query.uid; // Retrieve uid from query
        if (!uid || !users[uid]) {
            return res.status(404).send('User not found');
        }
        const totalFare = users[uid].totalFare;
        res.send(`Total fare of user ${uid} is ${totalFare} KRW.`);
    } catch (error) {
        console.error('Error in /fare route:', error);
        res.status(500).send('Internal Server Error');
    }
});

// GET /train/status route
app.get('/train/status', (req, res) => {
    try {
        const tid = req.query.tid; // Retrieve tid from query
        if (!tid || !trains[tid]) {
            return res.status(404).send('Train not found');
        }

        const train = trains[tid];
        const isSoldOut = train.bookedSeats >= train.maxSeats;
        res.send(`Train ${tid} is ${isSoldOut ? 'sold out' : 'not sold out'}`);
    } catch (error) {
        console.error('Error in /train/status route:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
