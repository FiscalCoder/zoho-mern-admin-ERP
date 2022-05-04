const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubTaskSchema = new Schema({
    taskID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Tasks"
    },
    name: {
        type: String,
        required: true
    },
    subTaskComment: {
        type: String,
    },
    status: {
        type: String,
        default: "UNACTIONED"
    },
    date: {
        type: Date,
        default: Date.now
    },
});

SubTaskSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

SubTaskSchema.set('toJSON', {
    virtuals: true
});

module.exports = User = mongoose.model("Subtasks", SubTaskSchema);
