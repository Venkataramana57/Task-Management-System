const User = require('../models/User');
const Task = require('../models/Task');

const tasksController = {
	canAct: async (req, task) => {
		const isAdmin = await tasksController.isAdmin(req);
		return !(!task || (!isAdmin && task.UserId !== req.user.id));
	},

	setTask: async (req) => {
		const task = await Task.findByPk(req.params.id);
		const canAct = await tasksController.canAct(req, task);
		if(!canAct) return false;

		return task;
	},

	isAdmin: async (req) => {
		const user = await User.findByPk(req.user.id);
		return user.role === 'admin';
	},

	createTask: async (req, res) => {
		const { title, description, priority, dueDate, status } = req.body;

		try {
			const task = await Task.create({ title, description, priority, dueDate, status, UserId: req.user.id });
			res.status(201).json(task);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},

	getAllTasks: async (req, res) => {
		const isAdmin = await tasksController.isAdmin(req);
		options = {}

		if(!isAdmin) {
			options.where = {UserId: req.user.id};
		}

		const tasks = await Task.findAll(options);
		res.status(201).json(tasks);
	},

	getTaskById: async (req, res) => {
		const task = await tasksController.setTask(req);
		if(!task) return res.status(403).json({ message: 'Unauthorized' });

		res.json(task);
	},

	updateTaskById: async (req, res) => {
		const task = await tasksController.setTask(req);
		if(!task) return res.status(403).json({ message: 'Unauthorized' });

		const { title, description, priority, dueDate, status } = req.body;
		try {
			await task.update({ title, description, priority, dueDate, status });
			res.json(task);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},

	destroyTaskById: async (req, res) => {
		const task = await tasksController.setTask(req);
		if(!task) return res.status(403).json({ message: 'Unauthorized' });

		try {
			await task.destroy();
		  res.json({ message: 'Task deleted' });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
}

module.exports = tasksController;
