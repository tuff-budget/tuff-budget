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

// create a function getExpectedRemainder
// const getExpectedRemainder (): number () => {
//   let sum = 0;
//   for (let i = 0; i < lineItemArray; i++){
    
//   }

// }
  // create sum variable set to zero
  // iterate  over every lineitem
    // add the spent amount to the sum
  // return sum


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
      
      {/* <h4>Current Total (Expected): {'$'.concat(budget.toLocaleString())}</h4>
      <h4>Remaining Budget (Expected): {'$'.concat((budget - budget).toLocaleString())}</h4> */}
{/* 
      <h4>Current Total (Expected): {'$'.concat(budget.toLocaleString())}</h4>
      <h4>Remaining Budget (Expected): {'$'.concat((budget - budget).toLocaleString())}</h4> */}
    </div>

    {/* LINE ITEM DATA */}
    <div className='line-item-container'>
      <div className='line-item-header'>
        <div><b>Description:</b></div>
        <div><b>Category:</b></div>
        <div><b>Expected Amount:</b></div>
        <div><b>Spent:</b></div>
        <div><b>Is Fixed?</b></div>
        <div><b>Is Recurring?</b></div>
      </div>
      {lineItemArray}
    </div>
    <div className='total-remaining'>
      <h4>Current Total (Expected): {'$'.concat(budget.toLocaleString())}</h4>
      <h4>Remaining Budget (Expected): {'$'.concat((budget - budget).toLocaleString())}</h4>
    </div>
    {/* ADD LINE ITEM FORM */}
    <div className='add-line-item-form'>
      <form onSubmit = {(e) => createLineItem(e, budgetID)}>
        <input placeholder = 'description'></input>
        <input placeholder = 'category'></input>
        <input placeholder = 'expected amount'></input>
        <input placeholder = 'actual amount'></input>
        {/* add check boxes for recocurring and fixed */}
        Fixed?: <input type='checkbox' name='Fixed'></input>
        Recurring?: <input type='checkbox' name='Recurring'></input>
        <button>Submit</button>
      </form>
    </div>
  </div>
  )
}

export default BudgetCard;