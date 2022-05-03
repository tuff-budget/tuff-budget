// SET UP APP
const express = require('express')
const app = express()
const port = 3000

// REQUIRE ROUTERS
const lineItemRouter = require('./routes/lineItems');
const budgetsRouter = require('./routes/budgets');

// CREATE ROUTES
app.use('/lineItems', lineItemRouter);
app.use('/budgets', budgetsRouter);

// CATCH-ALL ERROR HANDER
// app.use((req, res) => res.sendStatus(404))

// GLOBAL ERROR HANDLER
// app.use((err, req, res, next) => {
//     const defaultErr = {
//       log: 'Express error handler caught unknown middleware error',
//       status: 500,
//       message: { err: 'An error occurred' },
//     };
//     const errorObj = Object.assign({}, defaultErr, err);
//     console.log(errorObj.log);

//     return res.status(errorObj.status).json(errorObj.message);
//   });

// START SERVER
app.listen(port, () => console.log(`Server listening on port ${port}!`))

// EXPORT 
module.exports = app;