import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import FriendsExpenseCard from './FriendsExpenseCard';
import { useSelector } from 'react-redux';
import './FriendsExpenseList.css';

function FriendsExpensesList() {
  // TODO: Sort expenses by date and insert month dividers
  // ... Separate expenses into arrays by month, then nest a loop?
  const { friendId } = useParams();
  const currFriend = useSelector(state => state = state.friends[friendId])
  const allExpenses = useSelector(state => state.friendsExpenses)
  const currUser = useSelector(state => state.session.user)
  const [expenses, setExpenses] = useState([])
  const [openCards, setOpenCards] = useState([])
  const payments = useSelector(state => Object.values(state.payments).filter(payment => payment.userId === currUser.id))
  const [expensePayments, setExpensePayments] = useState([])

  useEffect(() => {
    const friendReceiver = Object.values(allExpenses).filter(expense => expense.payerId === currUser.id && expense.receiverId === parseInt(friendId))
    const friendPayer = Object.values(allExpenses).filter(expense => expense.payerId === parseInt(friendId) && expense.receiverId === currUser.id)
    const friendExpenses = [...friendReceiver, ...friendPayer, ...payments]

    setExpenses(friendExpenses)

  }, [allExpenses, currFriend, currUser])

  // useEffect(() => {
  //   payments.forEach(payment => console.log(new Date(payment.paymentDate).getTime()))
  // }, [])

  const handleClick  = (idx) => {
    if (!openCards.includes(idx)) {
      setOpenCards([...openCards, idx])
    } else {
      setOpenCards(openCards.filter(index => index !== idx))
    }
  }

  // get a list of payments, mix it with the list of expenses
  // if payments, set up the card this way, check by if it has a payment.expenseId
  // if expense, set up that way
  // send through to card,
  // if payment, do this way
  // ifexpense do that way
  // if paid off do this way
  // if not paid do that way

  return (
    <ul id="expenses-list">
      {Object.values(expenses).map((expense, idx)=> (
        <div key={expense.id} className='friend-expense' onClick={() => handleClick(idx)}>
          <div className="friends-expense-title">
            <span>{expense.description ? expense.description : `paid: ${expense.paymentDate}`}</span>
            {/* change this to the last payment date */}
            <span>{expense.settled ? `paid ${expense.expenseDate}`: ''}</span>
          </div>
          {openCards.includes(idx)
            ? <div className="">
                  <FriendsExpenseCard expense={expense}/>
              </div>
            : '' }
        </div>
      ))}
    </ul>
  );
}

export default FriendsExpensesList;
