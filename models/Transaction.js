const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    description:{
        type: String,
        default:"tranction description",
    },
    date:{
        type: Date,
        default: Date.now()
    }

},{
    timestamps: true,
})

module.exports = mongoose.model("Transaction", transactionSchema)