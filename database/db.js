const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('db connected');
    } catch (error) {
        console.error(error);
    }
};

module.exports = db;
