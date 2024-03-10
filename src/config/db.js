const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        .then(() => {
            console.log('✔ Connected to Database'.green.bold);
        })
        .catch((error) => {
            console.log(error);
        })
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
