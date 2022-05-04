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
  })
  //iterate through the open and create a new line per object
  return (
    <div>
      {/* add budget title followed by budget name. Prop drill from parent? */}
      <h1>{title}</h1>
      <div> {budget} </div>
      {/* add budget value. Prop drill from above? */}
      <div>{lineItemArray}</div>
      <form onSubmit = {(e) => createLineItem(e, budgetID)}>
          <input placeholder = 'description'></input>
          <input placeholder = 'category'></input>
          <input placeholder = 'expected amount'></input>
          <input placeholder = 'actual amount'></input>
          {/* add check boxes for recocurring and fixed */}
          <input placeholder = 'isFixed'></input>
          <input placeholder = 'isRecurring'></input>
          <button>Submit</button>
      </form>
    </div>

   )
}

export default BudgetCard;