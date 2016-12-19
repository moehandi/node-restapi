/**
 * Created by moehandi on 17/12/16.
 */
var mongoose = require('mongoose');

var TaskSchema  = new mongoose.Schema({
    name        : String,
    desc        : String,
    priority    : Number
});

module.exports = mongoose.model('Task', TaskSchema);
