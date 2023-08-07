const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const { validationResult } = require('express-validator');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('Неверный формат файла', false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
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

const updateAvatar = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'Отсутствует файл для загрузки' });
    }

    try {
        await User.updateOne({ _id: req.user.id }, { $set: { avatar: req.file.filename } });
        res.status(200).json({ avatar: req.file.filename });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    const { id } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const { name, lastname, patronymic, birthday, phone } = req.body;
    const updatedFields = { name, lastname, patronymic, birthday, phone };

    try {
        const currentUser = await User.findById(req.user.id);

        if (currentUser.role === 'admin' || id === req.user.id) {
            const user = await User.findOneAndUpdate(
                { _id: id },
                { $set: updatedFields },
                { new: true }
            );

            return res.json({ user });
        } else {
            return res.status(403).json({
                msg: 'У вас нет прав для редактирования пользователя',
            });
        }
    } catch (error) {
        next(error);
    }
};

const deleteProfile = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const userToDelete = await User.findById(userId);
        const currentUser = await User.findById(req.user.id);

        if (!userToDelete) {
            return res.status(404).json({ msg: 'Пользователь не найден' });
        }

        if (currentUser.role !== 'admin') {
            return res.status(403).json({ msg: 'У вас нет прав для удаления' });
        }

        if (userId === req.user.id) {
            return res.status(403).json({ msg: 'Вы не можете удалить сами себя' });
        }

        await User.deleteOne({ _id: userId });
        await Post.deleteMany({ userId: userToDelete._id });
        await Comment.deleteMany({ userId: userToDelete._id });

        return res.status(200).json({ msg: `Пользователь успешно удален` });
    } catch (error) {
        next(error);
    }
};

const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(401).json({ msg: 'Вы не авторизованы' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).select('-password').select('-login');

        if (!user) {
            return res.status(404).json({ msg: 'Пользователь не найден' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updateProfile,
    getProfile,
    deleteProfile,
    getMe,
    updateAvatar,
    uploadUserPhoto,
    resizeAvatar,
};
