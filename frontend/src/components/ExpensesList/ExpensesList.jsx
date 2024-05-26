import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExpenseCard from "./ExpenseCard";
import { centsToUSD } from "../../utils/formatters";
import "./ExpensesList.css";

function ExpensesList() {
  // TODO: Sort expenses by date and insert month dividers
  // ... Separate expenses into arrays by month, then nest a loop?
  const [selectedExpense, setSelectedExpense] = useState("");
  const expenses = useSelector((state) => state.friendsExpenses);
  const currUser = useSelector(state => state.session.user)
  const allFriends = useSelector((state) => state.friends)
  const allPayments = useSelector((state) => state.payments)



  const handleClick = (expenseId) => {
    if (selectedExpense === expenseId) setSelectedExpense("")
    else setSelectedExpense(expenseId);
  };

  const getCurrFriend = (expense) => {
    let currFriend;
    if (expense.receiverId === currUser.id) {
      currFriend = Object.values(allFriends).find(friend => friend.id === expense.payerId)
    }
    if (expense.payerId === currUser.id) {
      currFriend = Object.values(allFriends).find(friend => friend.id === expense.receiverId)
    }
    return currFriend.name
  }

  const whatsLeftToPay = (expense) => {
    const currPayments = Object.values(allPayments).filter(payment => payment.expenseId === expense.id)
    let total = 0;

    currPayments.forEach(payment => total += payment.amount)
    let adjustTotal = (expense.amount - total).toString()
    let due = '$' + adjustTotal.slice(0, -2) + '.' + adjustTotal.slice(-2)
    return due
  }


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
              {!expense.settled
                      ? <div>{expense.receiverId === currUser.id ? `${getCurrFriend(expense)} still owes you: ` : `You still owe ${getCurrFriend(expense)} : `}{whatsLeftToPay(expense)}</div>
                      : <div hidden={!expense.settled}>Expense Settled</div> }
              <div >{centsToUSD(expense.amount)}</div>
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
