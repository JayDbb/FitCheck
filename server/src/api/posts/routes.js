import express from 'express';
import controller from './controller';

const router = express.Router();
import verifyToken from '../auth/authMiddleware';

router.post('/create-post', verifyToken, controller.createPost); 
router.post('/add-rating', verifyToken, controller.addRating);
router.post('/add-comment',verifyToken, controller.addComment);
router.post('/get-ai-rating',verifyToken, controller.getAIrating);
router.post('/scan-image',verifyToken, controller.scanImage);

router.get('/get-posts', verifyToken, controller.getUserPosts);
router.get('/search', verifyToken, controller.searchPosts);

router.delete('/delete-post',verifyToken, controller.deletePost);


module.exports = router;