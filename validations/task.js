const validateUser = (req, res, next) => {
	const priorities = ['Low', 'Medium', 'High'];
	const statusOptions = ['To Do', 'In Progress', 'Done'];
	
	let isValid = true;
	const errors = []
	const { title, priority, dueDate, status } = req.body; 

	if(!title || title.length < 6 || title.length >= 10) {
		isValid = false;
		errors.push('Title is required and should be 4 to 12 chanracters long');
	}

	if(!dueDate || (dueDate && dueDate > new Date(dueDate))) {
		isValid = false;
		errors.push('Due Date is required and should be greater than today');
	}
	
	if(!priorities.includes(priority)) {
		isValid = false;
		errors.push("Priority should be either 'Low' or 'Medium' or 'High'");
	}

	if(!statusOptions.includes(status)) {
		isValid = false;
		errors.push("Status should be either 'To Do' or 'In Progress' or 'Done'");
	}

	if(!isValid) {
		return res.status(400).json({ errors: errors });
	}
	next();
}

module.exports = validateUser;
