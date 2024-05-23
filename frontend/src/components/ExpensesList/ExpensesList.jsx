import { useSelector } from "react-redux";

import ExpenseCard from "./ExpenseCard";
import "./ExpensesList.css";

function ExpensesList() {
  const expenses = useSelector((state) => state.friendsExpenses);
  // TODO: Sort expenses by date and insert month dividers
  // ... Separate expenses into arrays by month, then nest a loop?

  return (
    <ul id="expenses-list">
      {expenses &&
        Object.values(expenses).map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
    </ul>
  );
}

export default ExpensesList;
