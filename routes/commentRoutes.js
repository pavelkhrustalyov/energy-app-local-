const { Router } = require('express');

const auth = require('../middleware/auth');
const { check } = require('express-validator');

const router = Router();

const {
    createComment,
    deleteComment,
    getComments,
} = require('../controllers/commentControllers');

router.post("/comments/create/:postId", auth, [
    check('text', 'Текст комментария не может быть пустым').not().isEmpty()
], createComment);

router.delete("/comments/delete/:postId/:commentId", auth, deleteComment);

router.get("/comments/:postId", auth, getComments);


module.exports = router;
