const { Router } = require("express");

const router = Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const {
    updateProfile,
    getProfile,
    deleteProfile,
    getMe,
    updateAvatar,
    uploadUserPhoto,
    resizeAvatar } = require('../controllers/profileControllers');

router.get("/staff/me", auth, getMe);

router.get("/staff/:userId", auth, getProfile);

router.patch("/staff/update/:id", auth, [
    check('name', 'Имя обязательно для заполнения').not().isEmpty(),
    check('lastname', 'Фамилия обязательна для заполнения').not().isEmpty(),
    check('patronymic', 'Отчество обязательно для заполнения').not().isEmpty(),
    check('birthday', 'Дата рождения обязательна для заполнения').not().isEmpty(),
], updateProfile);

router.delete("/staff/:userId", auth, deleteProfile);

router.patch('/staff/avatar/:userId', auth, uploadUserPhoto, resizeAvatar, updateAvatar);


module.exports = router;