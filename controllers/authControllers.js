const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');

const register = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    const { name, lastname, patronymic, login, password, birthday, position, phone, department } = req.body;
    
    let user = await User.findOne({ login });

    if (user) {
        return res.status(400).json({ msg: "Пользователь уже существует" });
    }

    try {

        // salt password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            lastname,
            patronymic,
            login,
            birthday,
            phone,
            password: hashPassword,
            position,
            department,
        })
    
        await user.save();
    
        return res.status(200).json({
            msg: "Вы успешно зарегистрированы!"
        })
    } catch (error) {
        res.status(500).json({ msg: "Ошибка сервера" })
    }

}

const login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    try {
        const { login, password } = req.body;
    
        const user = await User.findOne({ login });
    
        if (!user) {
            return res.status(400).json({ msg: "Пользователь еще не зарегистрирован" });
        }
    
        const isComparePass = await bcrypt.compare(password, user.password);
    
        if (!isComparePass) {
            return res.status(401).json({ msg: "Неверный логин или пароль" });
        }
    
        const payload = {
            user: {
                id: user._id
            }
        }
    
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 * 24 * 31},
            (err, token) => {
                if (err) throw err;
                return res.json({ token });
            }
        );
    } catch (error) {
        res.status(500).json({ msg: "Ошибка сервера" })
    }

}

module.exports = {
    register,
    login
};
