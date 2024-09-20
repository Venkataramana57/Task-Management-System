const User = require('../models/User');
const Task = require('../models/Task');

const tasksController = {
	//////////////////// BELOW are no needed for now //////////////
	// canAct: (task, req, res) => {
	// 	if (!task || task.UserId !== req.user.id) {
	// 		return res.status(403).json({ message: 'Unauthorized' });
	// 	}
	// },

	// setTask: async (req) => {
	// 	return await Task.findByPk(req.params.id);
	// },
	//////////////////// ABOVE are no needed for now //////////////

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
		const task = await Task.findByPk(req.params.id);
		if (!task) {
			return res.status(403).json({ message: 'Unauthorized' });
		}	
		const isAdmin = await tasksController.isAdmin(req);

		console.log("isAdmin", isAdmin)
		if (!isAdmin && task.UserId !== req.user.id) {
			return res.status(403).json({ message: 'Unauthorized' });
		}

		res.json(task);
	},

	updateTaskById: async (req, res) => {
		const { title, description, priority, dueDate, status } = req.body;

		const task = await Task.findByPk(req.params.id);
		if (!task) {
			return res.status(403).json({ message: 'Unauthorized' });
		}	
		const isAdmin = await tasksController.isAdmin(req);
		if (!isAdmin && task.UserId !== req.user.id) {
			return res.status(403).json({ message: 'Unauthorized' });
		}

		try {
			await task.update({ title, description, priority, dueDate, status, UserId: req.user.id });
			res.json(task);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},

	destroyTaskById: async (req, res) => {
		const task = await Task.findByPk(req.params.id);
		
		if (!task) {
			return res.status(403).json({ message: 'Unauthorized' });
		}	
		const isAdmin = await tasksController.isAdmin(req);
		if (!isAdmin && task.UserId !== req.user.id) {
			return res.status(403).json({ message: 'Unauthorized' });
		}

		try {
			await task.destroy();
		  res.json({ message: 'Task deleted' });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
}

module.exports = tasksController;
