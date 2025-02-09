API Endpoints:

POST http:///localhost:5000/api/auth/register
POST http:///localhost:5000/api/auth/login
GET http:///localhost:5000/api/tasks/get-tasks
POST http:///localhost:5000/api/tasks/create
PUT http:///localhost:5000/api/tasks/update/67a857d76d2e2938752a8230 // This id which I have use, you can create 
DELETE http:///localhost:5000/api/tasks/delete/67a857d76d2e2938752a8230

To Start Server: nodemonn server.js
PORT : 5000
database link: MONGO_URI=mongodb://localhost:27017/taskmanager

For Frontend  Server: npm run dev
