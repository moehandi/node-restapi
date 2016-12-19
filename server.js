var express 	    = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var mongoose        = require('mongoose');
var config          = require('./api/configs/config');

var authController  = require('./api/controllers/AuthController');
var userController  = require('./api/controllers/UserController');
var taskController  = require('./api/controllers/TaskController');

var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
// app.set('token_secret', config.token_secret); // secret variable

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

var router = express.Router();

app.get('/', function(req, res) {
    res.send('Valid API is at http://localhost:' + port + '/api');
});
app.post('/auth/login', authController.login);
app.post('/auth/signup', authController.signup);

router.route('/users')
    .post(authController.isAuthenticated, userController.postUsers)
    .get(authController.isAuthenticated, userController.getAllUsers);

router.route('/users/:user_id')
    .get(authController.isAuthenticated, userController.getUsersById)
    .put(authController.isAuthenticated, userController.putUsersById)
    .delete(authController.isAuthenticated, userController.deleteUsersById);

router.route('/tasks')
    .post(authController.isAuthenticated, taskController.postTasks)
    .get(authController.isAuthenticated, taskController.getAllTasks);

router.route('/tasks/:task_id')
    .get(authController.isAuthenticated, taskController.getTaskById)
    .put(authController.isAuthenticated, taskController.putTaskById)
    .delete(authController.isAuthenticated, taskController.deleteTaskById);

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

app.use('/api', router);

app.listen(port);
console.log('Listening at http://localhost:' + port);
