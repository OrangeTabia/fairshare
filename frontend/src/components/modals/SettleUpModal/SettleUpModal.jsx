import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkAddPayment } from "../../../redux/payments";
import { useParams } from "react-router-dom";

import './SettleUpModal.css';
import { useSelector } from "react-redux";
import { thunkUpdateFriendsExpense } from "../../../redux/friends_expenses";

function SettleUpModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const { friendId } = useParams();

  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [expense, setExpense] = useState('')
  const [amountDue, setAmountDue] = useState(0)
  const [submitClass, setSubmitClass] = useState("form-submit disabled");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  // const [expenseSelection, setExpenseSelection] = useState([]);
  // const [hasSubmitted, setHasSubmitted] = useState(false);
  const allExpenses = useSelector(state => state.friendsExpenses);
  const currUser = useSelector(state => state.session.user);
  const paymentsMade = useSelector(state => state.payments);
  const friends = useSelector(state => state.friends);
  const payerExpenses = Object.values(allExpenses).filter((expense) => expense.payerId === currUser.id && expense.settled === false);
  const friendsArray = Object.values(friends);

  console.log("FRIENDS", friendsArray)
  console.log("PAYER EXPENSES", payerExpenses)

  const setSubmitDisabledStatus = (disabled) => {
    (disabled)
      ? setSubmitClass("form-submit disabled")
      : setSubmitClass("form-submit");
    setSubmitDisabled(disabled);
  };


  // useEffect(() => {
  //   if (friendId) {
  //     const receiverExpenses = Object.values(allExpenses).filter(expense => expense.payerId === parseInt(friendId) && expense.receiverId === currUser.id && expense.settled === false)
  //     const payerExpenses = Object.values(allExpenses).filter(expense => expense.payerId === currUser.id && expense.receiverId === parseInt(friendId) && expense.settled === false)
  //     const myExpenses = [receiverExpenses, payerExpenses]

  //     setExpenseSelection(...myExpenses)
  //   }else {
  //     const receiverExpenses = Object.values(allExpenses).filter(expense => expense.receiverId === currUser.id)
  //     const payerExpenses = Object.values(allExpenses).filter(expense => expense.receiverId === parseInt(friendId))
  //     const myExpenses = [receiverExpenses, payerExpenses]

  //     setExpenseSelection(...myExpenses)
  //   }

  // }, [friendId])

  useEffect(() => {
    let totalPaid = 0
    const myPayments = Object.values(paymentsMade).filter(payment => payment.expenseId === expense.id)
    if (myPayments.length) {
      myPayments.forEach(payment => totalPaid += payment.amount)
    }
    setAmountDue(expense.amount - totalPaid)
  }, [expense])

  useEffect(() => {
    // TEMP IMPLEMENTATION
    // Should disable submit button based on frontend validations
    setSubmitDisabledStatus(amount === null || paymentDate === null);
  }, [amount, paymentDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setHasSubmitted(true);

    await dispatch(
      thunkAddPayment({
        userId: currUser.id,
        expenseId: expense.id,
        amount: amount,
        paymentDate: `${paymentDate} 00:00:00`,
      })
    );

    if (amountDue - amount <= 0) {
      const newDate = new Date(expense.expenseDate);

      const settledExpense = {
        payerId: expense.payerId,
        receiverId: expense.receiverId,
        description: expense.description,
        amount: expense.amount,
        expenseDate: newDate,
        settled: true,
        notes: expense.notes,
      }


      await dispatch(
        thunkUpdateFriendsExpense(expense.id, settledExpense)
      ).then(() => {
        setExpense('')
        closeModal();
        navigate('/dashboard');
      })
    }
    setExpense('')
    closeModal();
    navigate('/dashboard');
  };

  return (
    <>
      <h2>Settle up</h2>
      {payerExpenses.length <= 0
        ? <h3>All your expenses are settled!</h3>
        :
      <form
      // onSubmit={handleSubmit}
      id="settle-up-form"
      >
        <div>
          <label htmlFor='expense'>Which Expense?</label>
            <select
              value={expense}
              onChange={(e) => setExpense(payerExpenses.find(expense => `$${expense.amount} - ${expense.description}` === e.target.value))}>
              <option value={''} disabled>Select an expense</option>
              {payerExpenses
                ? payerExpenses.map(expense => (
                  <option key={expense.id} >${expense.amount} - {expense.description}</option>
                  ))
                : ''}
            </select>
        </div>

        <div>
        This is where the friend drop down shows up
        </div> 

        <div>
          <label htmlFor="amount-owed"></label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={expense ? `You owe $${amountDue}` : 'amount'}
              required
            >
            </input>
        </div>
        <div>
          <div className="form-label">
            <label htmlFor="payment-date">Payment Date</label>
            {/* {validations.paymentDate && (
              <span className="form-error">{validations.paymentDate}</span>
            )} */}
          </div>
          <input
            id="payment-date"
            type="date"
            value={paymentDate}
            onChange={e => setPaymentDate(e.target.value)}
            placeholder="Payment Date"
            required
          />
        </div>
        <div className="form-buttons">
            <button
              className={submitClass}
              disabled={submitDisabled}
              type='submit'
            >
              Settle Up
            </button>
            <button className="form-cancel">Cancel</button>
          </div>
      </form>
      }
    </>
  )
}

export default SettleUpModal;
