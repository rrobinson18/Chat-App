const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema(
    {
        message: {
            type: String
        },
        sender: {
            type: String
        }
    },
    {
        timestamps: true
    }
);
    let Chat: mongoose.model("simple-chat", chatSchema);

    module.exports = Chat;