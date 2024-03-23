const router = require('express').Router();
const UserController = require('../controllers/userController');

router.post('/register-user', UserController.registerUser);

module.exports = router;