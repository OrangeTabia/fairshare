import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import FriendsExpenseCard from './FriendsExpenseCard';
import { useSelector } from 'react-redux';
import { centsToUSD } from "../../utils/formatters";
import './FriendsExpenseList.css';

function FriendsExpensesList() {
  const { friendId } = useParams();
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

  }, [allExpenses, friendId, currUser])

  // would like to also show all the payments made to the current user
  useEffect(() => {
    const myPayments = Object.values(allPayments).filter(payment => payment.userId === currUser.id)
    const expenseIds = expenses.map(expense => expense.id)
    const currPayments = myPayments.filter(payment => expenseIds.includes(payment.expenseId) )

    setPayments(Object.values(currPayments))
  }, [allPayments, expenses, currUser])

  useEffect(() => {
    setOpenCards([])
  }, [friendId, allPayments])

  const whatsLeftToPay = (expense) => {
    const currPayments = Object.values(allPayments).filter(payment => payment.expenseId === expense.id)
    let total = 0;

    currPayments.forEach(payment => total += payment.amount)
    let adjustTotal = (expense.amount - total).toString()
    return centsToUSD(adjustTotal)
  }

  const handleClick  = (idx) => {
    if (!openCards.includes(idx)) {
      setOpenCards([idx])
    } else {
      setOpenCards([])
    }
  }

  return (
    <section id="expenses-list">
      <h3>Expenses:</h3>
          {expenses.length
              ? <div>
                  {expenses.map((expense, idx)=> (
                  <div key={idx} className='friend-expense' >
                    <div className="friends-expense-title" onClick={() => handleClick(idx)}>
                      <div>{expense.description}</div>
                      {!expense.settled
                      ? <div className={expense.payerId === currUser.id
                        ? 'all-expenses-payer'
                        : 'all-expenses-receiver'}
                        >
                        {expense.receiverId === currUser.id
                          ? `${currFriend.name} still owes you: `
                          : `You still owe ${currFriend.name} : `}{whatsLeftToPay(expense)}
                        </div>
                      : <div hidden={!expense.settled}>Expense Settled</div> }
                      <div >{`Total: ${centsToUSD(expense.amount)}`}</div>
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
                {payments.map((payment, idx)=> (
                <div key={idx + 200} className='friend-payments' onClick={() => handleClick(idx + 200)}>
                  <div className="friends-expense-title" >
                    <div >{`paid: ${centsToUSD(payment.amount)}`}</div>
                    <div>{payment.paymentDate.slice(0, -12)}</div>
                  </div>
                  {openCards.includes(idx + 200)
                    ? <div className="a-payment">
                          <div>
                            <p>{`Payment of ${centsToUSD(payment.amount)}`}</p>
                            <p>{payment.userId === currUser.id ? `Paid by you` : `Paid by ${currFriend.name}`}</p>
                            <p>{`Paid on ${payment.paymentDate.slice(0, -12)}`}</p>
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
