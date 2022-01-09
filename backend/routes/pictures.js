const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const pictureCtrl = require('../controllers/pictures');

router.post('/', auth, multer, pictureCtrl.createPicture);
router.put('/:id', auth, multer, pictureCtrl.modifyPicture);
router.delete('/single/:id/:userId', auth, pictureCtrl.deletePicture);
router.delete('/many/:id', auth, pictureCtrl.deleteManyPictures);
router.get('/:id', auth, pictureCtrl.getOnePicture);
router.get('/', auth, pictureCtrl.getAllPictures);
router.post('/:id/like', auth, pictureCtrl.feedbackPicture);

module.exports = router;