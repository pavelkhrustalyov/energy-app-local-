const { Router } = require('express');

const router = Router();

const authController = require('../controllers/authControllers');

const { check } = require('express-validator');

router.post("/auth/register", [
    check('name', 'Имя обязательно для заполнения').not().isEmpty(),
    check('lastname', 'Фамилия обязательна для заполнения').not().isEmpty(),
    check('patronymic', 'Отчество обязательно для заполнения').not().isEmpty(),
    check('login', 'Логин обязателен для заполнения').not().isEmpty(),
    check('password', 'Минимальный пароль 6 символов').not().isEmpty().isLength({ min: 6 }),
    check('birthday', 'Дата рождения обязательна для заполнения').not().isEmpty(),
    check('position', 'Должность обязательна для заполнения').not().isEmpty(),
    check('department', 'Отдел обязателен для заполнения').not().isEmpty(),
    check('phone', 'Телефон обязателен для заполнения').not().isEmpty(),
], authController.register);


router.post("/auth/login", [
    check('login', 'Логин обязателен для заполнения').not().isEmpty(),
    check('password', 'Пароль не должен быть пустым').not().isEmpty()
], authController.login);


module.exports = router;
