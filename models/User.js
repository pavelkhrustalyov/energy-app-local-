const { Schema, model } = require('mongoose');
 
// установка схемы
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    patronymic: {
        type: String,
        required: true
    },

    login: {
        type: String,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    birthday: {
        type: Date,
        required: true
    },

    avatar: {
        type: String,
        default: "avatar.jpg"
    },

    phone: {
        unique: true,
        type: String
    },

    position: {
        type: String,
        enum: ['Начальник', 'Мастер', 'Инженер', 'Электрослесарь', 'Электромонтер', 'Связист'],
        required: true
    },

    department: {
        type: String,
        enum: ['Служба СЭСДТУ', 'Служба ПС', 'Служба РЗА', 'Служба ВЛЭП'],
        required: true
    },

    role: {
        type: String,
        default: "user"
    }
});

userSchema.pre('save', function(next) {
    if (this.position === "Начальник") {
        this.role = "admin";
        next();
    } else if (this.position === "Мастер" || this.position === "Инженер") {
        this.role = "moderator";
        next();
    } else {
        this.role = "user";
        next();
    }
});


module.exports = model('User', userSchema);