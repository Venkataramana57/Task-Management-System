const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const tasksController = require('../controllers/tasks');
const validateUser = require('../validations/task');

router.use(authenticateToken);

router.post('/', validateUser, tasksController.createTask);
router.get('/', tasksController.getAllTasks);
router.get('/:id', tasksController.getTaskById);
router.put('/:id', tasksController.updateTaskById);
router.delete('/:id', tasksController.destroyTaskById);

module.exports = router;
