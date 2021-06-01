const express = require('express');
const pool = require('../db');
const multer = require('multer');
const uuid = require('uuid');
const path = require('path');
const router = express.Router();



let avatarStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'avatars');
    },
    filename: function(req, file, cb) {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
})

var upload = multer({ storage: avatarStorage });


router.get('/', async(req, res) => {
    const allPlayers = await pool.query(`SELECT * FROM players`);
    res.send(JSON.stringify(allPlayers.rows));
})

router.post('/player', async(req, res) => {
    try {
        const { name, position, clubname } = req.body;
        const newPlayer = await pool.query(
            "INSERT INTO players (name, position, clubname) VALUES ($1, $2, $3) RETURNING *", [name, position, clubname])


        res.status(200).json(newPlayer.rows[0]).end();

    } catch (error) {
        console.error(error.body)
    }



});

router.get('/player/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const getPlayer = await pool.query('SELECT * FROM players WHERE player_id = $1 RETURNING *', [id])
        res.json(getPlayer.rows).end();

    } catch (error) {
        console.error(error.message)
    }
});

router.patch('/player/:id', async(req, res) => {
    try {
        const { name, position, clubname } = req.body;
        const { id } = req.params;
        const updatePlayer = await pool.query(
            "UPDATE players SET (name, position, clubname) = ($1, $2, $3) WHERE player_id = $4", [name, position, clubname, id]);
        res.send(`Updated player ${id} successfully.`).end();
    } catch (error) {
        console.error(error.message)
    }

});

router.put('/player/avatar/:id', upload.single('avatar'), async(req, res) => {
    const { id } = req.params;
    const { filename: image } = req.file;
    const updateAvatar = await pool.query(
        "UPDATE players SET avatar = $1 WHERE player_id = $2", [image, id]);
    console.log(updateAvatar)
    res.send('Avatar Updated').end();


});





module.exports = router