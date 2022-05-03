const express = require('express');
const router = express.Router();
import { Request, Response } from 'express';

// IMPORT CONTROLLERS
const budgetsController = require('../controllers/budgetsController');


// REQUEST HANDLERS
router.get('/', budgetsController.getBudgets, function (req: Request, res: Response) {
    res.send('POST request to the homepage');
  });
  
router.post('/', budgetsController.createBudget, function (req: Request, res: any) {
  console.log(res.locals.createdBudget)
    // FIXME: res.locals not found in router returning undefined
  res.status(200).json('test')//json(res.locals.createdBudget);
});

// EXPORT ROUTER
module.exports = router;
