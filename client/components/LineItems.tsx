import React from 'react';
import { LineItem } from '../../types'

interface LineItemProps {
  userID?: number,
  lineItemObject: LineItem,
  handleDeleteLineItem: (id: number, budgetID: number) => void,
  budgetID: number
}

const LineItems: React.FC<LineItemProps> = props => {
  const { lineItemObject, handleDeleteLineItem, budgetID } = props;
  const { description, category, expAmount, actAmount, isFixed, isRecurring, lineItemID } = lineItemObject;

  
  return (
    <div className='line-item'>
      <div>Description: {description}</div>
      <div>Expected Amount: {expAmount}</div>
      <div>Spent: {actAmount}</div>
      <div>Category: {category}</div>
      <div>Is Fixed? {isFixed}</div>
      <div>Is Recurring? {isRecurring}</div>
      <button  onClick={() => handleDeleteLineItem(lineItemID, budgetID)}>X</button>
    </div>
  )
}

export default LineItems;