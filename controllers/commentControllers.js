const { validationResult } = require('express-validator');


const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

const getComments = async (req, res) => {
    const postId = req.params.postId;

    const post = await Post.findOne({ _id: postId });

    if (!post) {
        return res.status(404).json({ msg: "Пост не найден!" });
    }

    await Post.populate(post, { path: 'comments.commentId' });

    await Post.populate(post, { 
        path: 'comments.commentId.userId', 
        select: 'name lastname avatar'
    });

    return res.status(200).json({ comments: post.comments })
}

const createComment = async (req, res) => {

    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ msg: "Пост не найден" });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let comment = await Comment.create({
        userId,
        text: req.body.text
    });

    post.comments.push(comment._id);


    await comment.save();
    await post.save();

    comment = await comment.populate('userId', ['name', 'lastname', 'avatar', 'position']).execPopulate();

    return res.status(200).json({ comment })
}

const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    const comment = await Comment.findOne({ _id: commentId });
    const userId = comment.userId.toString();

    const userFromComment = await User.findById(userId);

    const post = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $pull: { comments: commentId },
        },
        { new: true }
    );
    
    await Comment.findByIdAndDelete(commentId);

    const user = await User.findById(req.user.id);

    if (!comment) {
        return res.status(404).json({ msg: "Комментарий не найден!" });
    }
    if (!post) {
        return res.status(404).json({ msg: "Пост не найден!" });
    }

    if (userFromComment.department !== user.department) {
        return res.status(400).json({ msg: "Вы не можете удалить комментарий другой службы" });
    }

    if (userId !== req.user.id && (user.role !== 'moderator' && user.role !== 'admin')) {
        return res.status(400).json({ msg: "У вас нет прав для удаления" })
    }

    return res.status(200).json({
        msg: "Комментарий успешно удален",
    })
}


module.exports = {
    createComment,
    deleteComment,
    getComments,
}