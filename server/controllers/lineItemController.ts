export {};

import { NextFunction } from '../types';
import { Request, Response } from 'express';
const db = require('../models/dbModels');

const lineItemController = {
  // middleware to edit an existing line item in the database
//   modifyLineItem: (req: Request, res: Response, next: NextFunction) => {

//   },

  // middleware to enter a new line item into a database
  createLineItem: (req: Request, res: Response, next: NextFunction) => {
    //FIXME: REFACTOR ME probably a better way to do this
    const {
      budgetID,
      description,
      category,
      expAmount,
      actAmount,
      isFixed,
      isRecurring,
    } = req.body;

    const params = [
      budgetID,
      description,
      category,
      expAmount,
      actAmount || -1,
      isFixed,
      isRecurring,
    ];

    const sqlQuery = `
    INSERT INTO lineitems (budgetID, description, category, expAmount, actAmount, isFixed, isRecurring, isActive)
    VALUES ($1, $2, $3, $4, $5, $6, $7, true)
    RETURNING ID;
    `;

    // query the database to create a new li and return the new line item ID
    db.query(sqlQuery, params)
      .then((queryResults: any) => {
        res.locals.lineItemID = queryResults.rows[0].id;

        return next();
      })
      .catch((err: any) => {
        return next({
          log: 'Express error in createLineItem middleware',
          status: 400,
          message: {
            err: `lineItemController.createLineItem: ERROR: ${err}`,
          },
        });
      });
  },
};

module.exports = lineItemController;
