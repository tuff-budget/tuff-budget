export {};

import { NextFunction } from '../types';
import { Request, Response } from 'express';
const db = require('../models/dbModels');

const budgetsController = {
  // middleware to recieve all budgets for a specified user
  getBudgets: (req: Request, res: Response, next: NextFunction) => {
    // FIXME: change hardcoded userID to userID from login
    const userID = 1; // jakes userID
    const params = [userID];

    // define query to recieve all budgets for the specified user
    const sqlQuery = `
    SELECT * 
    FROM budgets
    WHERE userID = $1;
    `;

    // query the database and insert new budget
    db.query(sqlQuery, params)
      .then((res: any) => {
        // create an array of objects in frontend usable form for table display
        res.rows.forEach(budget)

        return next();
      })
      .catch((e: Error) => console.error(e.stack));
  },


  // middleware to create a new budget in the database
  createBudget: (req: Request, res: Response, next: NextFunction) => {
    const { userID, title, budget } = req.body;
    const params = [userID, title, budget];

    // define query to create new budget
    const sqlQuery = `
    INSERT INTO budgets (userID, title, budget)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;

    // query the database and insert new budget
    db.query(sqlQuery, params)
      .then((res: any) => {
        console.log('Created new budget:', title);

        // create and attach return object to locals so that frontend can display budget
        res.locals = {};
        res.locals.createdBudget = {
          ID: res.rows[0].id,
          userID: res.rows[0].userid,
          title: res.rows[0].title,
          budget: res.rows[0].budget,
        };

        return next();
      })
      .catch((e: Error) => console.error(e.stack));
  },
};

module.exports = budgetsController;
