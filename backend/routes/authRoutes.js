import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { authCheck , signup , login , logout  } from '../controller/authController.js';


const router = express.Router();


router.post('/signup', signup);

router.post('/login', login);



router.post('/logout',protectRoute, logout);
 
router.get('/check',protectRoute, authCheck);


export default router;
