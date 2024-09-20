# README

This is a small application that tracks the tasks created by Admin and Normal User.
Admin can create and manage all tasks regardless he created or not while Normal User can manage his/her won tasks.

Things covered:
* Node version 
	- v18.20.4

* Express version 
	- 4.21.0

* Database
  - MySql
* Authentication:
    - Json Web Token

* System dependencies
  - Sequelize npm is used to ORM the MySql database
  - BCryptJS is used to hasing the password 

* Implementaion Plan
	- Created Users table with username, password and role('Admin', 'User')
    - Created Tasks table with title, description, priority('Low', 'Medium', 'High'), dueDate, status('To Do', 'In Progress', 'Done')
    - Integrated User to have many tasks relation
    - Integrated Authentication system and permission by role system
    - Implemented all APIs for User Registration, User Login, Tasks(Create/View/Update/Delete)
    - Admin can create/view/update/delete tasks after successful login and by providing the Bearer token
    - Normal User can create/view/update/delete only his/her tasks after successful login and by providing the Bearer token

* Configuration to rn the application.
	- cd task-manager-api
	- npm install 
    - install nodemon as a global library
    - npm start
    - Run the application in http://localhost:3000/

* APIs.
	- [POST] http://localhost:3000/api/auth/register    - User Register
  - [POST] http://localhost:3000/api/auth/login     - User Login
  - [GET] http://localhost:3000/api/tasks           - To view all tasks
  - [POST] http://localhost:3000/api/tasks          - To create a task
  - [GET] http://localhost:3000/api/tasks/:id       - To view a task
  - [PUT] http://localhost:3000/api/tasks/:id       - To update a task
  - [DELETE] http://localhost:3000/api/tasks/:id    - To destroy a task
