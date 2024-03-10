const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
const db = new sqlite3.Database('./Resources/StarWarsdatabase.db');

// Configure express to serve static files from the `public` directory.
app.use(express.static('public'));

  // Requires there to be a `speed` query paramter.
app.get('/vehicle/speed', (req, res) => {
    console.log(`Running handler for ${req.url}`)
    // Extract and validate the request paramters.
    const query = `
        SELECT name, max_atmosphering_speed
        FROM vehicles`
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // Send the data as JSON in the response
        res.json({
            data: rows
        });
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Do any clean up when we tell the process to stop.
// Code copied from "Example Graceful Shutdown" on https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html/
process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing express')
    server.close(() => {
        // Close the database.
        db.close();
    });
});
