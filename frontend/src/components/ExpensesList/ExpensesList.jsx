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
    <ul id="expenses-list">
      {Object.values(expenses).map((expense) => (
        <div
          key={expense.id}
          onClick={() => handleClick(expense.id)}
          className="expense-container"
        >
          <div className="expense-preview">
            <p className="description">{expense.description}</p>
          </div>
          <div>
            {selectedExpense === expense.id && <ExpenseCard expense={expense} />}
          </div>
        </div>
      ))}
    </ul>
  );
}

export default ExpensesList;
