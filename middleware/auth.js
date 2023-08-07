const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({
            msg: "Нет токена, авторизация отменена"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next()

    } catch(e) {
        res.status(401).json({ msg: "Некорректный токен" });
    }


}

module.exports = auth;