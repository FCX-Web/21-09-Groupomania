const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comments');

router.post('/', auth, commentCtrl.createComment);
router.delete('/single/:id/:userId', auth, commentCtrl.deleteComment);
router.delete('/manyone/:id/:userId', auth, commentCtrl.deleteManyCommentsOnePicture);
router.delete('/many/:id', auth, commentCtrl.deleteManyComments);
router.get('/', auth, commentCtrl.getAllComments);

module.exports = router;