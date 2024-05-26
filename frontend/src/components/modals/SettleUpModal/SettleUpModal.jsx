import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkAddPayment } from "../../../redux/payments";
import { removeDecimals } from "../../../utils/formatters";

import './SettleUpModal.css';
import { useSelector } from "react-redux";
import { thunkUpdateFriendsExpense } from "../../../redux/friends_expenses";

function SettleUpModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  // Store an ID instead of storing an empty string
  const [expense, setExpense] = useState('');
  const [amountDue, setAmountDue] = useState(0)
  const [submitClass, setSubmitClass] = useState("form-submit disabled");
  const [expenseSelection, setExpenseSelection] = useState([])
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const allExpenses = useSelector(state => state.friendsExpenses);
  const currUser = useSelector(state => state.session.user);
  const paymentsMade = useSelector(state => state.payments);
  const friends = useSelector(state => state.friends);
  const payerExpenses = Object.values(allExpenses).filter((expense) => expense.payerId === currUser.id && expense.settled === false);
  const friendsArray = Object.values(friends);
  const [chosenExpense, setChosenExpense] = useState('')
  const [receiver, setReceiver] = useState('')


  const setSubmitDisabledStatus = (disabled) => {
    (disabled)
      ? setSubmitClass("form-submit disabled")
      : setSubmitClass("form-submit");
    setSubmitDisabled(disabled);
  };

    // Select our expense from all of the expenses and then find the receiving friend
  useEffect(() => {
    const findExpense = payerExpenses.find(thisExpense => thisExpense.id === parseInt(expense))
    setChosenExpense(findExpense)
  }, [expense])

  useEffect(() => {
    setReceiver(friendsArray.find((friend) => friend.id == chosenExpense?.receiverId))
  }, [expense, chosenExpense])




  useEffect(() => {
    const validationErrors = {};
    if (parseInt(amount) <= 0) {
      validationErrors.amount = 'Payment must be more than 0'
    }
    if (removeDecimals(amount) > amountDue) {
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
    const payerExpensesList = Object.values(allExpenses).filter((expense) => expense.payerId === currUser.id && expense.settled === false);
    setExpenseSelection(payerExpensesList)
  }, [allExpenses])

  // Storing all of my payments
  useEffect(() => {
    let totalPaid = 0
    const myPayments = Object.values(paymentsMade).filter(payment => payment.expenseId === parseInt(expense))
    if (myPayments.length) {
      myPayments.forEach(payment => totalPaid += payment.amount)
    }
    if (chosenExpense) {
      setAmountDue(chosenExpense.amount - totalPaid)
    }
  }, [expense, chosenExpense, paymentsMade])

  useEffect(() => {
    // TEMP IMPLEMENTATION
    // Should disable submit button based on frontend validations
    setSubmitDisabledStatus(amount === null || paymentDate === null);
  }, [amount, paymentDate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(Object.values(errors).length) {
      return;
    }
    setHasSubmitted(false)

    let adjustedAmount = removeDecimals(amount);

    let addPayment = await dispatch(
      thunkAddPayment({
        userId: currUser.id,
        expenseId: chosenExpense.id,
        amount: adjustedAmount,
        paymentDate: `${paymentDate} 00:00:00`,
      })
    );

    if (addPayment.server) {
      return;
    }

    if (amountDue - adjustedAmount <= 0) {
      const newDate = new Date(chosenExpense.expenseDate);

      const settledExpense = {
        payerId: chosenExpense.payerId,
        receiverId: chosenExpense.receiverId,
        description: chosenExpense.description,
        amount: chosenExpense?.amount,
        expenseDate: newDate,
        settled: true,
        notes: chosenExpense.notes,
      }


      await dispatch(
        thunkUpdateFriendsExpense(chosenExpense.id, settledExpense)
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
      {expenseSelection.length <= 0
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
              onChange={(e) => {
                setExpense(e.target.value)
              }
            }
            >
              <option value={''} disabled>Select an expense</option>
              {payerExpenses.map((expense) => (
                  <option key={expense.id} value={expense.id} >{expense.description}</option>
                ))}
            </select>
        </div>

        <div>
        <img className='user-profile-image' src={receiver?.profileImage} hidden={receiver == null}/>
        <span> {receiver?.name}</span>
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
        {hasSubmitted && errors.amount ? <span className="form-error">{errors.amount}</span> : ''}
        <div>
          <div className="form-label">
            <label htmlFor="payment-date">Payment Date</label>
            {hasSubmitted && errors.paymentDate ? <span className="form-error">{errors.paymentDate}</span> : ''}
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
        <div>{hasSubmitted && errors.paymentDate ? `${errors.paymentDate}` : ''}</div>
        <div className="form-buttons">
            <button
              className={submitClass}
              disabled={submitDisabled}
              type='submit'
              onClick={() => setHasSubmitted(true)}
            >
              Settle Up
            </button>
            <button
            className="form-cancel"
            onClick={closeModal}
            >
              Cancel</button>
          </div>
      </form>
      }
    </>
  )
}

export default SettleUpModal;
