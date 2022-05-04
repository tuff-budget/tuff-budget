const express = require('express');
const router = express.Router();
import { Request, Response } from 'express';

// IMPORT CONTROLLERS
const lineItemController = require('../controllers/lineItemController');


// REQUEST HANDLERS
// router.patch('/', lineItemController.getBudgets, function (req: Request, res: Response) {
//     res.send('POST request to the homepage');
//   });
  
router.post('/', lineItemController.createLineItem, function (req: Request, res: any) {
  res.status(200).json(res.locals.lineItemID);
});

// EXPORT ROUTER
module.exports = router;
