# Node Express REST API

An example of TaskManager Projects show how easy to build NodeJS with Express framework, MongoDB, with JWT Authentication.

## Running Example
1. Install Required Node Module.
Run 'npm install --save' in the project directory.
2. Check config.js in /node-restapi/api/configs/config.js
this is configuration file. change with your own configuration
3. Run the Projects with Node or Nodemon (https://nodemon.io/) :
node server.js
4. Test your HTTP Request with postman or curl

## REST API Endpoint
1. User
    - url:port/api/users (Method:GET, return All users)
   
2. Task
    - url:port/api/tasks        (Method:POST, Post new Task)
    - url:port/api/tasks        (Method:GET, GET All new Tasks)
    - url:port/api/tasks/:id    (METHOD:GET, GET Task By Id)
    - url:port/api/tasks/:id    (METHOD:PUT, PUT/Update Task By Id)
    - url:port/api/tasks/:id    (METHOD:Delete, Delete Task By Id)

3. Authentication
    - url:port/auth/signup (Post New User)
    - url:port/auth/login (Login with Method POST to Authenticate User to get TOKEN)