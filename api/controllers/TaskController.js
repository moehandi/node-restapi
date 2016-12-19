/**
 * Created by moehandi on 17/12/16.
 */

var Task        = require('../models/TaskModel');

exports.postTasks = function (req, res) {
    var task = new Task();
    task.name = req.body.name;
    task.desc = req.body.desc;
    task.priority = req.body.priority;

    task.save(function (err) {
        if(err)
            res.send(err);

        res.json({ message: 'Task created', data: task})
    });
};

exports.getAllTasks = function (req, res) {
    Task.find(function (err, tasks) {
        if(err)
            res.send(err);

        res.json(tasks);
    });
};

exports.getTaskById = function (req, res) {
    Task.findById(req.params.task_id, function (err, task) {
        if(err)
            res.send(err)

        res.json(task);
    }) ;
};

exports.putTaskById = function (req, res) {
    Task.findById(req.params.task_id, function (err, task) {

        if(err) res.send(err);

        task.name = req.body.name;
        task.desc = req.body.desc;
        task.priority = req.body.priority;

        task.save(function (err) {
            if (err) res.send(err);

            res.json(task)
        });
    }) ;
};

exports.deleteTaskById = function (req, res) {
    Task.findByIdAndRemove(req.params.task_id, function (err, task) {

        if(err) res.send(err)

        res.json({message: 'task deleted!'});
    }) ;
};
