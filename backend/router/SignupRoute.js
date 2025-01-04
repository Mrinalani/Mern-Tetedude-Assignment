import express from 'express';
const router = express.Router();

import  {addFriend, getFriend, getUserByuserNameAndEmail, loginController, removeFriend, SignupController} from "../controller/SignupController.js";
import { authenticateUser } from '../middleware/auth.js';

router.post('/signup', SignupController);
// router.get('/user/:username/:email',getUserByuserNameAndEmail);
router.post('/login', loginController)
router.post('/addfriend',authenticateUser, addFriend)
router.post('/removefriend', authenticateUser, removeFriend)
router.post('/getfriend', authenticateUser, getFriend)

export default router;