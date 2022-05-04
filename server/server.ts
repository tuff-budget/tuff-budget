export {};

// SET UP APP
import {Express} from 'express'
const express = require('express');
const app:Express = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// REQUIRE ROUTERS
const lineItemRouter = require('./routes/lineItems');
const budgetsRouter = require('./routes/budgets');
// const usersRouter = require('./routes/users');


// CREATE ROUTES
app.use('/lineItems', lineItemRouter);
app.use('/budgets', budgetsRouter);
// app.use('/users', usersRouter);


// CATCH-ALL ERROR HANDLER
app.use((req: Request, res: any) => res.status(404).send('You are in the wrong place! 😡'))


// GLOBAL ERROR HANDLER
app.use((err: any, req: any, res: any, next: any) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);

    return res.status(errorObj.status).json(errorObj.message);
  });


// START SERVER
app.listen(port, () => console.log(`Server listening on port ${port}!`));


// EXPORT 
module.exports = app;