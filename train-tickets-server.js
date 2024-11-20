const express = require('express');
const app = express();

const users = {
    '22': { name: 'Beauregard', totalFare: 127600 },
    '23': { name: 'Jessica', totalFare: 156000 },
    '24': { name: 'Minjae', totalFare: 89000 },
    '36': {name: 'Lola', totalFare: 33500}
};

const trains = {
    1: { bookedSeats: 100, maxSeats: 100 },
    2: { bookedSeats: 60, maxSeats: 120 },
    3: { bookedSeats: 30, maxSeats: 30 },
    4: {bookedSeats: 65, maxSeats: 80},
    5: {bookedSeats: 88, maxSeats: 100},
    16: {bookedSeats: 105, maxSeats: 105}
};

app.get('/fare', (req, res) => {
    try {
        const uid = req.query.uid; 
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

app.get('/train/status', (req, res) => {
    try {
        const tid = req.query.tid; 
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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
