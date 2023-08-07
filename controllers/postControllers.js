const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        const error = new Error('Неверный формат файла');
        cb(error, false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const uploadPostPhoto = upload.single('postImage');

const resizePostPhoto = (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `${req.user.id}-${Date.now()}.jpeg`;

    sharp(req.file.buffer)
    .resize(400, 400)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile('public/images/posts/' + req.file.filename);
    next();
}


const createPost = async (req, res) => {

    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user.role !== "moderator" && user.role !== "admin") {
        return res.status(400).json({ msg: "У вас нет прав для создания поста" });
    }

    if (!req.body.text || req.body.text.trim() === '') {
        return res.status(400).json({ msg: "Текст поста не может быть пустым" });
    }

    let post = await Post.create({
        text: req.body.text.trim(),
        userId,
        image: req.file ? req.file.filename : 'post-image.jpg'
    })

    await post.save();

    await post.populate('userId',  ['-password', '-role', '-login']);

    return res.status(200).json({ post });
}

const deletePost = async (req, res) => {

    const user = await User.findById(req.user.id);
    const postId = req.params.postId;

    let post = await Post.findOne({_id: postId});

    if (!post) {
        return res.status(404).json({ msg: "Пост не найден" });
    }

    if (post.userId.toString() !== req.user.id && user.role !== 'admin') {
        return res.status(422).json({ msg: "Вы не можете удалить чужой пост" });
    }

    if (user.role !== 'moderator' && user.role !== 'admin') {
        return res.status(422).json({ msg: "У вас нет прав для удаления поста" });
    }

    post = await post.populate('userId', 'department').execPopulate();

    if (post.userId.department !== user.department) {
        return res.status(422).json({ msg: "У вас нет прав для удаления поста" });
    }

    const deleted = await Post.findByIdAndDelete(postId);

    await Comment.deleteMany({ _id: { $in: deleted.comments }});

    return res.json({ msg: "Пост успешно удален!" });
}

const getPosts = async (req, res) => {
    const user = await User.findById(req.user.id);

    let posts = await Post.find()
    .sort([['date', -1]])
    .populate('userId', ['-password', '-role', '-login'])
    .populate('check', 'name lastname avatar')
    .populate('comments', 'userId text date')
    .populate({
        path: 'comments',
        populate: {
          path: 'userId',
          model: 'User'
        } 
     })

    posts = posts.filter(post => post.userId.department === user.department);
    
    return res.status(200).json(posts);
}


const realiseCheckUncheck = async (req, res) => {
    const postId = req.params.postId;

    let post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ msg: "Пост не найден!" });
    }

    let check = post.check;
    const userId = req.user.id;
    const index = check.indexOf(userId);

    if (index !== -1) {
        check.splice(index, 1);
    } else {
        check.push(userId);
    }

    await post.save();
    await post.populate('check', 'name lastname avatar');

    return res.status(200).json(post);
}

module.exports = {
    createPost,
    deletePost,
    getPosts,
    realiseCheckUncheck,
    uploadPostPhoto,
    resizePostPhoto
}