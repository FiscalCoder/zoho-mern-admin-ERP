const express = require('express');
const router = express.Router();
const validateTaskInput = require('../../validation/Task');
const Task = require('../../models/Task');
const Subtask = require('../../models/SubTask');


router.post('/task-get', (req, res) => {
    // Task.find({ empID: req.body.empID }).populate('subtask').exec((err, tasks) => {
    //     console.log(tasks)
    //     console.log(err)
    //     return res.status(200).send(tasks);
    // });;


    Task.find({ empID: req.body.empID }).then(async (tasks) => {
        if (tasks) {

            let joinedTask = []

            for (let index = 0; index < tasks.length; index++) {
                const task = tasks[index];
                const subtasks = await Subtask.find({ taskID: task._id });
                const jss = JSON.parse(JSON.stringify(task))
                joinedTask.push({ ...jss, subtasks })

            }
            return res.status(200).send(joinedTask);
        };
    });
})


router.post('/task-add', (req, res) => {
    const keyName = "taskName"
    const { errors, isValid } = validateTaskInput(req.body, keyName);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newTask = new Task({
        empID: req.body.empID,
        name: req.body[keyName],
        taskComment: req.body.taskComment,
    });

    newTask
        .save()
        .then(task => {
            return res.status(200).json({ message: 'Task added successfully. Refreshing data...' })
        }).catch(err => console.log(err));

});

router.post('/task-edit', (req, res) => {
    const keyName = req.body.keyName
    const { errors, isValid } = validateTaskInput(req.body, keyName);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const updateFields = {
        name: req.body.changedTaskName,
        taskComment: req.body.taskComment,
        status: req.body.taskStatus
    }

    Object.keys(updateFields).forEach(key => {
        if (updateFields[key] === undefined) {
            delete updateFields[key];
        }
    })


    Task
        .findOneAndUpdate({ _id: req.body.taskID }, updateFields)
        .then(task => {
            return res.status(200).json({ message: 'Task edited successfully. Refreshing data...' })
        }).catch(err => console.log(err));

});

router.post('/task-delete', (req, res) => {
    Task
        .deleteOne({ _id: req.body.taskID })
        .then(task => {
            Subtask.deleteMany({ taskID: req.body.taskID }).then(subtask => {
                return res.status(200).json({ message: 'Task deleted successfully. Refreshing data...' })
            })
        }).catch(err => console.log(err));

});

router.post('/task-comment-delete', (req, res) => {
    Task
        .findOneAndUpdate({ _id: req.body.taskID }, { taskComment: "" })
        .then(task => {
            return res.status(200).json({ message: 'Task Comment deleted successfully. Refreshing data...' })
        }).catch(err => console.log(err));
});




router.post('/subtask-add', (req, res) => {
    const keyName = "subTaskName"
    const { errors, isValid } = validateTaskInput(req.body, keyName);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    console.log(req.body)

    const newTask = new Subtask({
        taskID: req.body.taskID,
        name: req.body[keyName],
        subTaskComment: req.body.subTaskComment,
    });

    newTask
        .save()
        .then(task => {
            return res.status(200).json({ message: 'SubTask added successfully. Refreshing data...' })
        }).catch(err => console.log(err));

});

router.post('/subtask-edit', (req, res) => {
    const keyName = req.body.keyName
    console.log(req.body)
    const { errors, isValid } = validateTaskInput(req.body, keyName);
    if (!isValid) {
        return res.status(400).json(errors);
    }


    const updateFields = {
        name: req.body.changedTaskName,
        subTaskComment: req.body.subTaskComment,
        status: req.body.subTaskStatus
    }


    Object.keys(updateFields).forEach(key => {
        if (updateFields[key] === undefined) {
            delete updateFields[key];
        }
    })

    Subtask
        .findOneAndUpdate({ _id: req.body.subTaskID }, updateFields)
        .then(task => {
            return res.status(200).json({ message: 'Subtask edited successfully. Refreshing data...' })
        }).catch(err => console.log(err));

});

router.post('/subtask-comment-delete', (req, res) => {
    Subtask
        .findOneAndUpdate({ _id: req.body.subTaskID }, { subTaskComment: "" })
        .then(task => {
            return res.status(200).json({ message: 'Subtask Comment deleted successfully. Refreshing data...' })
        }).catch(err => console.log(err));

});


router.post('/subtask-delete', (req, res) => {
    Subtask
        .deleteOne({ _id: req.body.subTaskID })
        .then(task => {
            return res.status(200).json({ message: 'Subtask deleted successfully. Refreshing data...' })
        }).catch(err => console.log(err));

});



module.exports = router;
