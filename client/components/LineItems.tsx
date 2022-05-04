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
      <div>{description}</div>
      <div>{category}</div>
      <div>{'$'.concat(expAmount.toLocaleString())}</div>
      <div>{'$'.concat(expAmount.toLocaleString())}</div>
      <div>{isFixed}</div>
      <div>{isRecurring}</div>
      <div className='delete-button'><button onClick={() => handleDeleteLineItem(lineItemID, budgetID)}>X</button></div>
    </div>
  )
}

export default LineItems;