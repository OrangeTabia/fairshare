import { useEffect, useState } from 'react';
import ExpenseCard from './ExpenseCard';
import './ExpensesList.css';

function ExpensesList({expenses}) {
  // TODO: Sort expenses by date and insert month dividers
  // ... Separate expenses into arrays by month, then nest a loop?
  const [selectedExpense, setSelectedExpense] = useState('')

  useEffect(() => {

  })

  return (
    <ul id="expenses-list">
      {Object.values(expenses).map(expense => (
        <div key={expense.id} onClick={() => setSelectedExpense(expense)}>
            <span>{expense.description}</span>
            <div >
              <ExpenseCard expense={expense}/>
            </div>
        </div>
      ))}
    </ul>
  )
}

export default ExpensesList;
