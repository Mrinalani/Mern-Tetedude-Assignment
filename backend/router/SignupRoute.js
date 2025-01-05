import express from 'express';
const router = express.Router();

import  {followFriend, getFriend, loginController, unfollowFriend, SignupController, getAllUser, followBack, getRequest, getUser, acceptRequest, rejectRequest} from "../controller/SignupController.js";
import { authenticateUser } from '../middleware/auth.js';

router.post('/signup', SignupController);
router.post('/login', loginController)
router.get('/allUsers',authenticateUser, getAllUser)
router.get('/getUser', authenticateUser, getUser)
router.post('/followfriend/:friendId',authenticateUser, followFriend)
router.post('/unfollowfriend/:friendId', authenticateUser, unfollowFriend)
router.get('/getfriends', authenticateUser, getFriend)
router.post('/followback',authenticateUser, followBack)
router.get('/getrequests', authenticateUser, getRequest)
router.post('/acceptrequest/:friendId', authenticateUser, acceptRequest)
router.post('/rejectrequest/:friendId', authenticateUser, rejectRequest)



export default router;