import { useState, useEffect, useCallback } from "react";
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

  const allExpenses = useSelector(state => state.friendsExpenses);
  const currUser = useSelector(state => state.session.user);
  const paymentsMade = useSelector(state => state.payments);
  const friends = useSelector(state => state.friends);
  const friendsArray = Object.values(friends);
  const payerExpenses = Object.values(allExpenses).filter((expense) => expense.payerId === currUser.id && expense.settled === false);

  const [amount, setAmount] = useState('');
  const [amountDue, setAmountDue] = useState(0);
  const [paymentDate, setPaymentDate] = useState('');
  // Store an ID instead of storing an empty string
  const [expense, setExpense] = useState('');
  const [expenseSelection, setExpenseSelection] = useState([]);
  const [chosenExpense, setChosenExpense] = useState('');
  const [receiver, setReceiver] = useState('');

  const [validations, setValidations] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitClass, setSubmitClass] = useState("form-submit");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const setSubmitDisabledStatus = (disabled) => {
    (disabled)
    ? setSubmitClass("form-submit disabled")
    : setSubmitClass("form-submit");
    setSubmitDisabled(disabled);
  };

  const getValidations = useCallback(() => {
    const newValidations = {};

    if (removeDecimals(amount) <= 0) {
      newValidations.amount = 'Payment must be more than 0';
    }
    if (removeDecimals(amount) > amountDue) {
      newValidations.amount = 'Payment must be the same or less than what is owed';
    }
    const date = new Date(paymentDate)
    const today = new Date()
    if (paymentDate && (date.getTime() < today.getTime())) {
      newValidations.paymentDate = 'Payment date must be in the future';
    }
    return newValidations
  }, [amount, amountDue, paymentDate]);

  useEffect(() => {
    if (!hasSubmitted) return;
    const newValidations = getValidations();
    setSubmitDisabledStatus(Object.keys(newValidations).length);
    setValidations(newValidations);
  }, [hasSubmitted, getValidations]);

  // Select our expense from all of the expenses and then find the receiving friend
  useEffect(() => {
    const findExpense = payerExpenses.find(thisExpense => thisExpense.id === parseInt(expense))
    setChosenExpense(findExpense)
  }, [payerExpenses, expense]);

  useEffect(() => {
    setReceiver(friendsArray.find((friend) => friend.id == chosenExpense?.receiverId))
  }, [friendsArray, chosenExpense]);

  useEffect(() => {
    const payerExpensesList = Object.values(allExpenses).filter((expense) => expense.payerId === currUser.id && expense.settled === false);
    setExpenseSelection(payerExpensesList)
  }, [currUser, allExpenses, expense]);

  // Storing all of my payments
  useEffect(() => {
    let totalPaid = 0
    const myPayments = Object.values(paymentsMade).filter(payment => payment.expenseId === parseInt(expense))
    if (myPayments.length) {
      myPayments.forEach(payment => totalPaid += payment.amount);
    }
    if (chosenExpense) {
      setAmountDue(chosenExpense.amount - totalPaid);
    }
  }, [expense, chosenExpense, paymentsMade])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasSubmitted) {
      setHasSubmitted(true);
      const newValidations = getValidations()
      if (Object.keys(newValidations).length) return;
    }

    const adjustedAmount = removeDecimals(amount);

    const addPayment = await dispatch(
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
      });
    }
    setExpense('');
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
          <label htmlFor='expense'>Which Expense?&nbsp;&nbsp;&nbsp;</label>
            <select
              id="settle-expense-option"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
            >
              <option value={''} disabled>Select an expense</option>
              {payerExpenses.map((expense) => (
                  <option key={expense.id} value={expense.id} >{expense.description}</option>
                ))}
            </select>
        </div>

        <div id="settle-up-name-img">
          <img
            className='user-profile-image'
            src={receiver?.profileImage}
            hidden={receiver == null}
          />
          <span>{receiver?.name}</span>
        </div>

        <div>
          <div className="form-label">
            <label htmlFor="amount"></label>
            {validations.amount && (
              <span className="form-error">{validations.amount}</span>
            )}
          </div>
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
            {validations.paymentDate && (
              <span className="form-error">{validations.paymentDate}</span>
            )}
          </div>
          <input
            id="settle-payment-date"
            type="date"
            value={paymentDate}
            onChange={e => setPaymentDate(e.target.value)}
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
