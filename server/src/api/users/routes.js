import express from 'express';
import controller from './controller';

const router = express.Router();

router.post('/create', controller.createUser);
router.get('/get', controller.getUser);
router.post('/follow', controller.followUser);
router.post('/unfollow', controller.unfollowUser);

module.exports = router;
