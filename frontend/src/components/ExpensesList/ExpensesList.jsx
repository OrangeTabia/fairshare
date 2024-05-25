import { useState } from "react";
import { useSelector } from "react-redux";
import ExpenseCard from "./ExpenseCard";
import "./ExpensesList.css";

function ExpensesList() {
  // TODO: Sort expenses by date and insert month dividers
  // ... Separate expenses into arrays by month, then nest a loop?
  const [selectedExpense, setSelectedExpense] = useState("");
  const expenses = useSelector((state) => state.friendsExpenses);

  const handleClick = (expenseId) => {
    if (selectedExpense === expenseId) setSelectedExpense("")
    else setSelectedExpense(expenseId);
  };


  return (
    <section id="expenses-list-container">
      {Object.values(expenses).length
        ? <div>
        {Object.values(expenses).map((expense) => (
          <div key={expense.id} className='all-expenses' >
            <div
              onClick={() => handleClick(expense.id)}
              className="expense-container"
            >
              <div >{expense.description}</div>
              <div >{`$${(expense.amount).toString().slice(0, -2)}.${(expense.amount).toString().slice(-2)}`}</div>
              <span hidden={!expense.settled}>Expense Settled</span>
            </div>
            {selectedExpense === expense.id && <ExpenseCard expenseId={expense.id} />}
          </div>
        ))}
      </div>
      : <div className='no-expenses' >No current or past expenses</div>
      }
    </section>

  );
}

export default ExpensesList;
