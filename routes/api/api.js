import express from 'express';
var router = express.Router();


import directoryRouter from './controllers/directoryController.js';
import profileRouter from './controllers/profile.js';
import filterUser from './controllers/filterUser.js'

router.use('/profile', profileRouter);
router.use('/directory', directoryRouter);
router.use('/filter', filterUser)

export default router;