const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const { validationResult } = require('express-validator');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb('Неверный формат файла', false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const uploadUserPhoto = upload.single('avatar');

const resizeAvatar = (req, res, next) => {
    if (!req.file) return next();
  
    req.file.filename = `${req.user.id}-${Date.now()}.jpeg`;
  
    sharp(req.file.buffer)
      .resize(400, 400)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile('public/images/avatars/' + req.file.filename, (err) => {
        if (err) {
          return next(err);
        }
  
        next();
      });
};

const updateAvatar = async (req, res) => {
    await User.updateOne({ _id: req.user.id },
        { $set: { avatar: req.file.filename }}
    )
    res.status(200).json({ avatar: req.file.filename })
}

const updateProfile = async (req, res) => {

    const { id } = req.params;

    const errors = validationResult(req);

    const my = await User.findById({ _id: req.user.id });

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    const updatedFields = {
        name,
        lastname,
        patronymic,
        birthday,
        phone
    } = req.body;

    if (my.role === 'admin' || id === req.user.id) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: id },
                { $set: updatedFields },
                { new: true }
            );
        
            return res.json({ user })
        } catch (error) {
            return res.status(500).json({
                msg: "Ошибка сервера"
            })
        }
    } else {
        return res.status(422).json({
            msg: "У вас нет прав для редактирования пользователя"
        })
    }
}

const deleteProfile = async (req, res) => {

    const userId = req.params.userId;

    try {
        const user = await User.findById({ _id: userId });
        const me = await User.findById(req.user.id);

        if (!user) {
           return res.status(404).json({ msg: "Пользователь не найден" })
        }

        if (me.role !== "admin") {
            return res.status(422).json({ msg: "У вас нет прав для удаления" });
        }

        if (userId == req.user.id) {
            return res.status(422).json({ msg: "Вы не можете удалить сами себя" });
        }
        
        const name = user.name;
        const lastname = user.lastname;
    
        await User.deleteOne({ _id: userId })
        await Post.deleteMany({ userId: user._id });
        await Comment.deleteMany({ userId: user._id });
        
        return res.status(201).json({ msg: `Пользователь ${name} ${lastname} удален` });

    } catch (err) {
        return res.status(500).json({ msg: "Ошибка сервера" });
    }
}

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(401).json({ msg: "Вы не авторизованы" });
        }

        return res.status(200).json({ user });

    } catch (error) {
        return res.status(500).json({ msg: "Ошибка сервера" });
    }
}

const getProfile = async (req, res) => {

    try {
        
        const user = await User.findById({ _id: req.params.userId })
        .select('-password')
        .select('-login')

        if (!user) {
            return res.status(404).json({ msg: "Пользователь не найден" });
        }

        return res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ msg: "Ошибка сервера" });
    }
}


module.exports = {
    updateProfile,
    getProfile,
    deleteProfile,
    getMe,
    updateAvatar,
    uploadUserPhoto,
    resizeAvatar
}

