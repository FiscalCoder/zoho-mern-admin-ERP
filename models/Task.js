const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    empID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    taskComment: {
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
    subtask: [{
        type: Schema.Types.ObjectId,
        ref: "Subtasks"
    }]
});

TaskSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

TaskSchema.set('toJSON', {
    virtuals: true
});

module.exports = Task = mongoose.model("Tasks", TaskSchema);
