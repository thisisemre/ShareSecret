import { Router } from "express";
import db from '../config/database.js';

const router = Router();

router.get('/secret', async (req, res) => {

    try {
        const result = await db.query('SELECT * FROM secrets ORDER BY RANDOM() LIMIT 3');
        res.status(200).send(result.rows);
    } catch (error) {
        console.error('Error fetching secrets:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/secret', async (req, res) => {
    const { secret, username } = req.body;
    try {
        const result = await db.query('INSERT INTO secrets(secret, username) VALUES($1, $2) RETURNING *', [secret, username]);
        res.status(201).send(result.rows[0]);
    } catch (error) {
        console.error('Error inserting secret:', error);
        res.status(500).send('Internal Server Error');
    }
});

// make it private and it have to be work on when the secret seen x times 
router.delete('/secret/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM secrets WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Secret not found');
        }
        res.status(200).send(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/secret/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const result = await db.query('UPDATE secrets SET seen = seen + 1 WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Secret not found');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
        
    }

});




export default router;