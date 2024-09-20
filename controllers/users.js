const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const usersController = {
	signup: async (req, res) => {
		const { username, password, role } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		try {
			const user = await User.create({ username, password: hashedPassword, role });
			res.status(201).json(user);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},

	login: async (req, res) => {
		const { username, password } = req.body;
		const user = await User.findOne({ where: { username } });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
		res.json({ token });
	}
}

module.exports = usersController;
