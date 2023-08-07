const { Router } = require("express");
const { check } = require('express-validator');
const auth = require('../middleware/auth');

const { getWallPosts, createWallPost } = require('../controllers/wallPostControllers');


const router = Router();


router.get('/wallPosts/:recipientId', auth, getWallPosts);

router.post('/wallPosts/:authorId/:recipientId/', auth, [
    check('text', 'Текст поста не может быть пустым').not().isEmpty()
], createWallPost);


module.exports = router;