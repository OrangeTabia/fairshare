import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkAddPayment } from "../../../redux/payments";

import './SettleUpModal.css';
import { useSelector } from "react-redux";
import { thunkUpdateFriendsExpense } from "../../../redux/friends_expenses";

function SettleUpModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [expense, setExpense] = useState('')
  const [amountDue, setAmountDue] = useState(0)
  const [submitClass, setSubmitClass] = useState("form-submit disabled");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
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


  useEffect(() => {
    const validationErrors = {};
    if (parseInt(amount) <= 0) {
      validationErrors.amount = 'Payment must be more than 0'
    }
    if (parseInt(amount) > amountDue) {
      validationErrors.amount = 'Payment must be the same or less than what is owed'
    }
    let date = new Date(paymentDate)
    let today = new Date()
    if (paymentDate) {
      if (date.getTime() < today.getTime()) {
        validationErrors.paymentDate = 'Payment date must be in the future'
      }
    }
    setErrors(validationErrors)
  }, [amount, paymentDate, amountDue]);



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
    
    if(Object.values(errors).length) return;
    setHasSubmitted(false)

    let adjustedAmount = amount;

    if (amount.indexOf('.') >= 0) {
      adjustedAmount = parseInt(amount.toString().slice(0, amount.indexOf('.')) + amount.toString().slice(amount.indexOf('.') + 1))
    }

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
        navigate('/');
      })
    }
    setExpense('')
    closeModal();
    navigate('/');
  };

  return (
    <>
      <h2>Settle up</h2>
      {payerExpenses.length <= 0
        ? <h3>All your expenses are settled!</h3>
        :
      <form
      onSubmit={handleSubmit}
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
        This is where the friend shows up
        </div> 

        <div>
          <label htmlFor="amount-owed"></label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={expense ? `You owe $${amountDue.toString().slice(0, -2)}.${amountDue.toString().slice(-2)}` : 'amount'}
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
