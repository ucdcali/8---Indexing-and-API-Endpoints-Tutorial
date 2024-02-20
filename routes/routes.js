import express from 'express';
import * as ctrl from '../controllers/mainController.js';

const router = express.Router();

// Define routes
router.get('/', ctrl.home);
router.post('/api/students', ctrl.getStudents);
            
export default router;
