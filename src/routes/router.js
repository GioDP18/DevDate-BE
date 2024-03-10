const express = require('express');
const authController = require('../controllers/authController');
const matchController = require('../controllers/matchController');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/send-match-request', matchController.sendMatchRequest);
router.put('/accept-match-request/:matchRequestId', matchController.acceptMatchRequest);
router.put('/reject-match-request/:matchRequestId', matchController.rejectMatchRequest);
router.post('/create-post', postController.createPost);

module.exports = router;