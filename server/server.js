const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
const db = new sqlite3.Database('./Resources/StarWarsdatabase.db');

// Configure express to serve static files from the `public` directory.
app.use(express.static('public'));

/**
 * Fetches all the vehicles in the database.
 */
app.get('/vehicleName', (req, res) => {
    console.log(`Running handler for ${req.url}`)

    console.log(`Querying database for vehicles data.`);
    const query = `
        SELECT DISTINCT(name)
        FROM vehicles
        ORDER BY name ASC;`
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        const allVehicleName = [];
        for (const row of rows) {
            allVehicleName.push(row["name"]);
        }

        // Send the data as JSON in the response
        res.json({ data: allVehicleName });
    });
});


  // Requires there to be a `planets` query paramter.
app.get('/vehicleSpeed', (req, res) => {
    console.log(`Running handler for ${req.url}`)
    // Extract and validate the request paramters.
    const name = req.query.vehicleName;    
    if (!name) {
      res.status(400).json({ error: 'Expected vehicles name query paramter to be populated'});
      return;
    }

    console.log(`Querying database for population data. vehicleName=${name}`);
    const query = `
        SELECT max_atmosphering_speed
        FROM vehicles
        WHERE name = :name;`
    db.all(query, { ":name": name }, (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // Send the data as JSON in the response
        res.json({
            name,
            data: rows,
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
