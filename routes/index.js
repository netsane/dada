import express from 'express';
import { login } from '../controllers/authController.js';
import {
  bootstrap,
  deleteCoffee,
  deleteSesame,
  getCoffee,
  getHealth,
  getSesame,
  postCoffee,
  postSesame,
  updateCoffee,
  updateSesame,
} from '../controllers/exportController.js';
import { requireAuth } from '../middleware/auth.js';
const { authRequired, optionalAuth, requireModule, requirePermission } = require('../middleware/auth');


const router = express.Router();

router.get('/health', getHealth);
router.post('/auth/login', login);
router.get('/bootstrap', bootstrap);

router.get('/coffee', requireAuth, getCoffee);
router.post('/coffee', requireAuth, postCoffee);
router.put('/coffee/:id', requireAuth, updateCoffee);
router.delete('/coffee/:id', requireAuth, deleteCoffee);

router.get('/sesame', requireAuth, getSesame);
router.post('/sesame', requireAuth, postSesame);
router.put('/sesame/:id', requireAuth, updateSesame);
router.delete('/sesame/:id', requireAuth, deleteSesame);
router.get('/collections/:collection', authRequired, crud.list);
router.get('/collections/:collection/:id', authRequired, crud.getOne);
router.post('/collections/:collection', authRequired, requirePermission('CAN_ADD_RECORD', 'edit-export', '*'), crud.create);
router.put('/collections/:collection/:id', authRequired, requirePermission('CAN_EDIT_RECORD', 'edit-export', '*'), crud.update);
router.delete('/collections/:collection/:id', authRequired, requirePermission('CAN_DELETE_RECORD', '*'), crud.remove);
export default router;
