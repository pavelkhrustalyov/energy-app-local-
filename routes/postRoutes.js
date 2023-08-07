const { Router } = require('express');
const auth = require('../middleware/auth');

const { check } = require('express-validator');

const {
    createPost,
    deletePost,
    getPosts,
    realiseCheckUncheck,
    uploadPostPhoto,
    resizePostPhoto
 } = require('../controllers/postControllers');

const router = Router();

router.get('/posts', auth, getPosts);

router.post("/posts/create", auth, [
    check('text', 'Текст поста не может быть пустым!').not().isEmpty(),
], uploadPostPhoto, resizePostPhoto, createPost);

router.delete("/posts/delete/:postId", auth, deletePost);

router.post("/posts/checkUncheck/:postId", auth, realiseCheckUncheck);

module.exports = router;
