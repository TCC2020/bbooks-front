const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Chat = Schema({
    exchangeId: {
        type: String,
        required: true,
        unique: true
    },
    messages: [
        {
            message: {
                type: String,
                required: true
            },
            data: {
                type: Date,
                required: true
            },
            profileSender: {
                type: Number,
                required: true
            }
        }
    ]
});

mongoose.model('chats', Chat);