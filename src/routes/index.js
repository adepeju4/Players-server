const express = require('express');
const router = express.Router();
const path = require('path');
const uuid = require('uuid');
const multer = require('multer');
const playersModel = require('../models');
const { update } = require('../models');


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

    const allPlayers = await playersModel.find({}).exec()

    res.send(`${JSON.stringify(allPlayers)}`).end()
});
router.post('/', async(req, res) => {
    const player = req.body;
    const createdPlayer = await playersModel.create(player);
    res.send(`created ${JSON.stringify(createdPlayer)}`).end()
});

router.patch('/:id', async(req, res) => {
    const updatePlayer = await playersModel.findOneAndUpdate({})
    console.log('edited');
});

router.put('/avatar/:id', upload.single('avatar'), async(req, res) => {
    const { id } = req.params;
    console.log('avatar created or updated');
    const { filename: image } = req.file;
    const updateAvatar = await playersModel.findOneAndUpdate({ _id: id }, { avatar: image }, { new: true }).exec();
    res.send({ data: updateAvatar }).end();
});

router.get('/:id', async(req, res) => {
    const playerId = req.params.id;
    const player = await playersModel.findOne({ _id: playerId }).exec()
    res.send(`gotten player ${player}`).end();
});



module.exports = router;