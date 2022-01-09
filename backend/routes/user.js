const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.signin);
router.get('/', auth, userCtrl.getAllUsers);
router.delete('/deleteUser', userCtrl.deleteUser);
router.put('/:id', auth, userCtrl.modifyUser);

module.exports = router;