const User = require('../models/User');
const WallPost = require('../models/WallPost');

const { validationResult } = require('express-validator');

const getWallPosts = async (req, res) => {

    try {
        const { recipientId } = req.params;

        const wallPosts = await WallPost.find({ recipient: recipientId })
        .populate('author', ['name', 'lastname', 'avatar', 'position', 'patronymic'])
        .sort({ date: -1 })
        return res.json(wallPosts);
    } catch (error) {
        res.status(500).json({ msg: "Ошибка сервера" })
    }
}

const createWallPost = async (req, res) => {
    const { authorId, recipientId } = req.params;
    
    const { text, date } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        let wallPost = await WallPost.create({
            author: authorId,
            recipient: recipientId,
            text,
            date
        })

        await wallPost.save();

        wallPost = await wallPost.populate('author', ['name', 'lastname', 'avatar', 'position', 'patronymic']).execPopulate();

        return res.status(200).json(wallPost);

    } catch (error) {
        res.status(500).json({ msg: "Ошибка сервера" })
    }
}


module.exports = { getWallPosts, createWallPost }