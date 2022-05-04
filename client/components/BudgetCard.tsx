import React from 'react';
import LineItems from './LineItems'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Budget, LineItemArray, LineItem } from '../../types';

interface BudgetCardProps {
  handleDeleteBudget: (id: number) => void,
  createBudget: (e: React.FormEvent<HTMLFormElement>) => void,
  handleDeleteLineItem: (id: number, budgetID: number) => void,
  createLineItem: (e: React.FormEvent<HTMLFormElement>, budgetID: number) => void,
  userID: number,
  budgetObject: Budget
}

const BudgetCard: React.FC<BudgetCardProps> = props => {
const { userID, budgetObject, handleDeleteBudget, createBudget, handleDeleteLineItem, createLineItem } = props;
const { lineItems, title, budget, budgetID } = budgetObject;


const lineItemArray: JSX.Element[] = [];
lineItems.map(lineItem => {
  lineItemArray.push(<LineItems
  key={lineItem.lineItemID}
  lineItemObject={lineItem}
  handleDeleteLineItem={handleDeleteLineItem}
  budgetID={budgetID}
  userID={userID}
  />)
});

// calculate the total amount budgeted
const getExpectedTotal = () => {
  let sum = 0;
  lineItems.forEach((li:LineItem) => sum += li.expAmount);
  return sum;
}

// calculate the total amount spent
const getActualTotal = () => {
  let sum = 0;
  lineItems.forEach((li:LineItem) => {
    // only include actual if it is a spent amount (> 1)
    if (li.actAmount >= 0) sum += li.actAmount;
  });
  return sum;
}

const expectedTotal = getExpectedTotal();
const actualTotal = getActualTotal();

//iterate through the open and create a new line per object
return (
  <div className='budget-card'>
    {/* DELETE BUDGET FORM */}
    <div className = 'delete-budget-button'>
      <button onClick = {(e) => handleDeleteBudget(budgetID)}>X</button>
    </div>

    {/* BUDGET META DATA */}
    <div className='budget-meta-data'>
      <h2>{title}</h2>
      <h4>Budget: {'$'.concat(budget.toLocaleString())}</h4>
      <div className='budget-meta-totals'>
        <div className='budget-meta-expected'>
          <p>Expected:</p>
          <p>Current Total: {'$'.concat(expectedTotal.toLocaleString())}</p>
          <p>Remaining Budget: {'$'.concat((budget - expectedTotal).toLocaleString())}</p>
        </div>
        <div className='budget-meta-actual'>
          <p>Actual:</p>
          <p>Current Total (Actual): {'$'.concat(actualTotal.toLocaleString())}</p>
          <p>Remaining Budget (Actual): {'$'.concat((budget - actualTotal).toLocaleString())}</p>
        </div>
      </div>
    </div>

    {/* LINE ITEM DATA */}
    <div className='line-item-container'>
      <div className='line-item-header'>
        <div>Description: </div>
        <div>Category: </div>
        <div>Expected Amount: </div>
        <div>Spent: </div>
        <div>Is Fixed? </div>
        <div>Is Recurring?</div>
      </div>
      {lineItemArray}
    </div>

    {/* ADD LINE ITEM FORM */}
    <div className='add-line-item-form'>
      <form onSubmit = {(e) => createLineItem(e, budgetID)}>
        <input placeholder = 'description'></input>
        <input placeholder = 'category'></input>
        <input placeholder = 'expected amount'></input>
        <input placeholder = 'actual amount'></input>
        {/* add check boxes for recocurring and fixed */}
        Is Fixed?: <input type='checkbox' name='Fixed'></input>
        Is Recurring?: <input type='checkbox' name='Recurring'></input>
        <button>Submit</button>
      </form>
    </div>
  </div>
  )
}

export default BudgetCard;