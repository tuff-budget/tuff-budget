import React from 'react';
import BudgetCard from './BudgetCard'
import { BudgetArray, HandleFunctions } from '../../types';

interface BudgetCardListProps {
  handleDeleteBudget: (id: number) => void,
  createBudget: (e: React.FormEvent<HTMLFormElement>) => void,
  handleDeleteLineItem: (id: number, budgetID: number) => void,
  createLineItem: (e: React.FormEvent<HTMLFormElement>, budgetID: number) => void,
  budgetArray: BudgetArray,
  userID: number,
}

const BudgetCardList: React.FC<BudgetCardListProps> = props => {
  const { budgetArray, userID, handleDeleteBudget, createBudget, handleDeleteLineItem, createLineItem } = props;

  return (
    <div className='budget-list-container'>
      {budgetArray.map((budget, i) => <BudgetCard
         key={budget.budgetID} 
         createBudget={createBudget} 
         handleDeleteBudget={handleDeleteBudget}
         createLineItem={createLineItem}
         handleDeleteLineItem= {handleDeleteLineItem}
         userID={userID} 
         budgetObject={budget}/>
      )}
    </div>

  )
}

export default BudgetCardList;