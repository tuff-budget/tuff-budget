import React from 'react';
import BudgetCardList from './BudgetCardList';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { BudgetArray, LineItem } from '../../types';



const MainContainer: React.FC = () => {
  const hardLineItemsArray = [
    {
      lineItemID: 1,
      description: 'My item',
      category: 'awesomeCat',
      expAmount: 20,
      actAmount: 30,
      isFixed: false,
      isRecurring: false
    },
    {
      lineItemID: 2,
      description: 'your item',
      category: 'awesomeDog',
      expAmount: 210,
      actAmount: 340,
      isFixed: false,
      isRecurring: true
    }
  ];
  const hardLineItemsArray2 = [
    {
      lineItemID: 3,
      description: 'i item',
      category: 'sadCat',
      expAmount: 20,
      actAmount: 30,
      isFixed: true,
      isRecurring: true
    },
    {
      lineItemID: 4,
      description: 'this item',
      category: 'foodcat',
      expAmount: 10,
      actAmount: 50,
      isFixed: false,
      isRecurring: true
    }
  ];
  const hardItemBudget = [
    {
      title: 'Budget 1',
      budgetID: 1,
      userID: 1,
      budget: 200,
      lineItems: hardLineItemsArray
    },
    {
      title: 'Budget 2',
      budgetID: 2,
      userID: 2,
      budget: 10,
      lineItems: hardLineItemsArray2
    }
]

  const [ budgetArray, setBudgetArray ] = useState<BudgetArray>(hardItemBudget);
  const [ userID, setuserID ] = useState(0)
  console.log(budgetArray);
  
  // add budget functionalit
  const [ title, setTitle ] = useState('');
  const [ budget, setBudget ] = useState(0);
  
  //make initial fetch to the database for all user budgets.
  const budgetFetch = async () => {
    const result = await axios.get('/budgets')
    console.log(result.data);
    setBudgetArray(result.data);
  }
  
  //on initial render, fetch the budgets from the database.
  useEffect(() => {
    //budgetFetch();
    console.log('use effect fired off');
  }, [])
  
  // ------------------------------------- Card CRUD Functionality ---------------------------------------
  
  // handles the deleting of a budget card
  function handleDeleteBudget(id: number) {
    axios.delete(`/budgets/${id}`)
    .then(() => {
      const updatedBudgetArray = [...budgetArray]
      for(let i = 0; i < updatedBudgetArray.length; i++) {
        if (updatedBudgetArray[i].budgetID === id) {
          updatedBudgetArray.splice(i,1)
        }
      }
      setBudgetArray(updatedBudgetArray)
    })
  }
  // handles the creating of budget card 
  function createBudget (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    //console.log(title, budget);
    console.log('e', e)
    axios.post('/budgets', {
      title: title,
      budget: budget,
      userID: userID
    }).then(res => {
      const currentBudgetArray = JSON.parse(JSON.stringify(budgetArray));
      currentBudgetArray.push(res.data)
      setBudgetArray(currentBudgetArray)
    })
  }
  // ------------------------------------- Line Item CRUD Functionality ------------------------------------------
  // handles the deleting of a line itemg
  function handleDeleteLineItem(id: number, budgetID: number) {
    axios.delete(`/lineItem/${id}`)
    .then(() => {
      const newBudgetArray = JSON.parse(JSON.stringify(budgetArray));
      for (let budget of newBudgetArray){
        if (budget.budgetID === budgetID){
          for (let lineItem of budget.lineItems){
            if (lineItem.lineItemID === id){
              delete newBudgetArray[budget][lineItem];
              break;
            }
          }
        }
      }
      setBudgetArray(newBudgetArray)
    })
  }
  
  function createLineItem (e: any, budgetID: number) {
    console.log('this is e ', e);
    console.log('this is e.target ', e.target);
    console.log('this is at 0 ', e.target[0].value);
    e.preventDefault()
    
    const description = e.target[0].value;
    const category = e.target[1].value;
    const expAmount = parseInt(e.target[2].value);
    let actAmount = parseInt(e.target[3].value);
    const isFixed = e.target[4].value;
    const isRecurring = e.target[5].value;
    if (!actAmount) actAmount = -1;

    const newLineItem = { description, category, expAmount, actAmount, isFixed, isRecurring, budgetID }
    axios.post('/lineItems', {newLineItem})
    .then(res => {
      console.log(res.data);
      const lineItem = { description, category, expAmount, actAmount, isFixed, isRecurring, lineItemID: res.data };
      const newBudgetArray = JSON.parse(JSON.stringify(budgetArray));
      for (let budget of newBudgetArray){
        if (budget.budgetID === budgetID){
           newBudgetArray[budget].lineItems.push(lineItem)
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
          <input placeholder = 'name of project' onChange = {(e) => handleChange(e, 'title')}></input>
          <input placeholder = 'budget' onChange = {(e) => handleChange(e, 'budget')}></input>
          <button>Add Budget</button>
        </form>
      </div>
    </div>
  )
}

export default MainContainer;

// function createBudget(e: any) {
//   throw new Error('Function not implemented.');
// }
