import React, {Suspense} from 'react';
// const BudgetCardList = React.lazy (() => import ('./BudgetCardList'));
import BudgetCardList from './BudgetCardList';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { BudgetArray, LineItem, LineItemArray, Budget } from '../../types';



const MainContainer: React.FC = () => {

  const [ budgetArray, setBudgetArray ] = useState<BudgetArray>([]);
  const [ userID, setuserID ] = useState(1)
  
  // add budget functionality
  const [ title, setTitle ] = useState('');
  const [ budget, setBudget ] = useState(0);
  
  //make initial fetch to the database for all user budgets.
  const budgetFetch = async () => {
    const result = await axios.get(`http://localhost:3000/budgets/${userID}`)
    setBudgetArray(result.data);
  }
  
  //on initial render, fetch the budgets from the database.
  useEffect(() => {
    budgetFetch();
    console.log('use effect fired off');
  }, [])
  
  // ------------------------------------- Card CRUD Functionality ---------------------------------------
  
  // handles the deleting of a budget card
  function handleDeleteBudget(id: number) {
    axios.delete(`http://localhost:3000/budgets/${id}`)
    .then(() => {
      const updatedBudgetArray = JSON.parse(JSON.stringify(budgetArray));
      for(let i = 0; i < updatedBudgetArray.length; i++) {
        if (updatedBudgetArray[i].budgetID === id) {
          updatedBudgetArray.splice(i,1)
        }
      }
      setBudgetArray(updatedBudgetArray)
    })
  }

  // handles the creating of budget card 
  function createBudget (e:any) {
    e.preventDefault()
    e.target[0].value = '';
    e.target[1].value = '';

    axios.post('http://localhost:3000/budgets', {
      userID: userID,
      title: title,
      budget: budget
    }).then(res => {
      const currentBudgetArray = JSON.parse(JSON.stringify(budgetArray));
      const { budget, budgetID, title, userID} = res.data
      const newBudget:Budget = {
        budget, budgetID, title, lineItems: []
      }

      currentBudgetArray.push(newBudget);
      setBudgetArray(currentBudgetArray);
      setTitle('');
      setBudget(0);
    })
  }
  // ------------------------------------- Line Item CRUD Functionality ------------------------------------------
  // handles the deleting of a line item
  function handleDeleteLineItem(id: number, budgetID: number) {
    axios.delete(`http://localhost:3000/lineItems/${id}`)
    .then(() => {
      const newBudgetArray = JSON.parse(JSON.stringify(budgetArray));
      for (let budget of newBudgetArray){
        if (budget.budgetID === budgetID){
          for (let i = 0; i < budget.lineItems.length; i++){
            if (budget.lineItems[i].lineItemID === id){
              console.log('lineItemFound ')
              delete budget.lineItems[i];
              break;
            }
          }
        }
      }
      setBudgetArray(newBudgetArray)
    })
  }
  
  function createLineItem (e: any, budgetID: number) {
    e.preventDefault()
    
    const description = e.target[0].value;
    const category = e.target[1].value;
    const expAmount = parseInt(e.target[2].value);
    let actAmount = parseInt(e.target[3].value);
    const isFixed = e.target[4].checked;
    const isRecurring = e.target[5].checked;
    
    e.target[0].value = '';
    e.target[1].value = '';
    e.target[2].value = '';
    e.target[3].value = '';
    e.target[4].checked = false;
    e.target[5].checked = false;
    
    if (!actAmount) actAmount = -1;
    //console.log('this is the budgetID ', budgetID)
    const newLineItem = { description, category, expAmount, actAmount, isFixed, isRecurring, budgetID }

    axios.post('http://localhost:3000/lineItems', newLineItem)
    .then(res => {
      //console.log(res.data);
      if (actAmount === -1) actAmount = 0;
      const lineItem:LineItem = { description, category, expAmount, actAmount, isFixed, isRecurring, lineItemID: res.data };
      const newBudgetArray = JSON.parse(JSON.stringify(budgetArray));
      for (let budget of newBudgetArray){
        if (budget.budgetID === budgetID){
           budget.lineItems.push(lineItem)
          }
        }
      setBudgetArray(newBudgetArray)
    })
  }
  
  //handles the changing of title and budget
  function handleChange(e:React.ChangeEvent<HTMLInputElement>, field:string) {
    e.preventDefault()
    
    if (field === 'title') {
      setTitle(e.target.value)
    } else {
      setBudget(parseInt(e.target.value))
    }
  }
  
  return (
    <div>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <BudgetCardList
      budgetArray={budgetArray}
      handleDeleteBudget={handleDeleteBudget}
      createBudget={createBudget}
      handleDeleteLineItem={handleDeleteLineItem}
      createLineItem={createLineItem}
      userID={userID}

      />
      <div className='create-budget-form'>
        <form onSubmit = {(e) => createBudget(e)}>
          <input className = 'name-of-project' placeholder = 'name of project' onChange = {(e) => handleChange(e, 'title')}></input>
          <input className = 'budget-amount'placeholder = 'budget' onChange = {(e) => handleChange(e, 'budget')}></input>
          <button>Add Budget</button>
        </form>
      </div>
      {/* </Suspense> */}
    </div>
  )
}

export default MainContainer;

// function createBudget(e: any) {
//   throw new Error('Function not implemented.');
// }
