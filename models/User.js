const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
        required: true
    }
});

UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true
});

module.exports = User = mongoose.model("users", UserSchema);
