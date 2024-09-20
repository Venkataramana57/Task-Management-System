const validateUser = (req, res, next) => {
	const availableRoles = ['admin', 'user'];
	let isValid = true;
	const errors = []
	const { username, password, role } = req.body;

	if(!username || !password || !role) {
		isValid = false;
		errors.push('All fields are required');
	}
	if(username.length < 6 || username.length >= 10) {
		isValid = false;
		errors.push('Username should be 6 to 10 chanracters long');
	}
	if(password.length < 6 || password.length >= 12) {
		isValid = false;
		errors.push('Password should be 6 to 12 chanracters long');
	}
	if(!availableRoles.includes(role)) {
		isValid = false;
		errors.push("Role should be either 'admin' or 'user'");
	}

	if(!isValid) {
		return res.status(400).json({ errors: errors });
	}
	next();
}

module.exports = validateUser;
