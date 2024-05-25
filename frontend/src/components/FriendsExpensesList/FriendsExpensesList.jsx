import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import FriendsExpenseCard from './FriendsExpenseCard';
import { useSelector } from 'react-redux';
import './FriendsExpenseList.css';

function FriendsExpensesList() {
  const { friendId } = useParams();
  // const currFriend = useSelector(state => state = state.friends[friendId])
  // const [expensePayments, setExpensePayments] = useState([])
  const allExpenses = useSelector(state => state.friendsExpenses)
  const currUser = useSelector(state => state.session.user)
  const currFriend = useSelector(state => state.friends[parseInt(friendId)])

  const allPayments = useSelector(state => state.payments)
  const [expenses, setExpenses] = useState([])
  const [payments, setPayments] = useState([])

  const [openCards, setOpenCards] = useState([])




  useEffect(() => {
      const friendReceiver = Object.values(allExpenses).filter(expense => expense.payerId === currUser.id && expense.receiverId === parseInt(friendId))
      const friendPayer = Object.values(allExpenses).filter(expense => expense.payerId === parseInt(friendId) && expense.receiverId === currUser.id)
      const friendExpenses = [...friendReceiver, ...friendPayer]

      setExpenses(Object.values(friendExpenses))

  }, [allExpenses, friendId])

  // would like to also show all the payments made to the current user
  useEffect(() => {
    const myPayments = Object.values(allPayments).filter(payment => payment.userId === currUser.id)
    const expenseIds = expenses.map(expense => expense.id)
    const currPayments = myPayments.filter(payment => expenseIds.includes(payment.expenseId) )

    setPayments(Object.values(currPayments))
  }, [allPayments, expenses])

  useEffect(() => {
    setOpenCards([])
  }, [friendId, allPayments])

  const handleClick  = (idx) => {
    if (!openCards.includes(idx)) {
      setOpenCards([...openCards, idx])
    } else {
      setOpenCards(openCards.filter(index => index !== idx))
    }
  }

  return (
    <section id="expenses-list">
      <h3>Expenses:</h3>
          {expenses.length
              ? <div>
                  {expenses.map((expense, idx)=> (
                  <div key={idx} className='friend-expense'>
                    <div className="friends-expense-title" onClick={() => handleClick(idx)}>
                      <div >{expense.description}</div>
                      <div >{`$${(expense.amount).toString().slice(0, -2)}.${(expense.amount).toString().slice(-2)}`}</div>
                      <span hidden={!expense.settled}>Expense Settled</span>
                    </div>
                    {openCards.includes(idx)
                      ? <div><FriendsExpenseCard  expenseId={expense.id} /></div>
                      : '' }
                  </div>
                ))}
              </div>
          : <div className='no-expenses' >{`No current or past expenses with ${currFriend?.name}`}</div> }

      <h3>Payments:</h3>
          {payments.length
          ? <div>
                {payments.map((expense, idx)=> (
                <div key={idx + 200} className='friend-payments'>
                  <div className="friends-expense-title" onClick={() => handleClick(idx + 200)}>
                    <div >{`paid: `}</div>
                    <div>{expense.paymentDate}</div>
                  </div>
                  {openCards.includes(idx + 200)
                    ? <div className="a-payment">
                          <div>
                            <p>{`Payment of $${(expense.amount).toString().slice(0, -2)}.${(expense.amount).toString().slice(-2)}`}</p>
                            <p>{`Paid on ${expense.paymentDate.slice(0, -12)}`}</p>
                          </div>
                      </div>
                    : '' }
                </div>
              ))}
          </div>
          : <div className='no-expenses' >{`No current or past payments to ${currFriend?.name}`}</div> }
    </section>
  );
}

export default FriendsExpensesList;
