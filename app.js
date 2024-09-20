const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send("Task Manager API is running on port 3000")
});

sequelize.sync()
  .then(() => {
    app.listen(3000, () => console.log('Server started on http://localhost:3000'));
  })
  .catch((err) => console.log('Error: ' + err));
