import express from 'express'
import { tester } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/test', tester)

export default router;