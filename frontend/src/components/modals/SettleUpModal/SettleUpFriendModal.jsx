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
  const [expenseSelection, setExpenseSelection] = useState([])
  const [amountDue, setAmountDue] = useState(0)
  const [errors, setErrors] = useState({})
  // const [validations, setValiations] = useState({})
  const [submitClass, setSubmitClass] = useState("form-submit disabled");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  // const [hasSubmitted, setHasSubmitted] = useState(false);
  const allExpenses = useSelector(state => state.friendsExpenses)
  const currUser = useSelector(state => state.session.user)
  const currFriend = useSelector(state => state.userEmails[parseInt(friendId)])
  const paymentsMade = useSelector(state => state.payments)

  const setSubmitDisabledStatus = (disabled) => {
    (disabled)
      ? setSubmitClass("form-submit disabled")
      : setSubmitClass("form-submit");
    setSubmitDisabled(disabled);
  };

  useEffect(() => {
    if (friendId) {
      const receiverExpenses = Object.values(allExpenses).filter(expense => expense.payerId === parseInt(friendId) && expense.receiverId === currUser.id && expense.settled === false)
      const payerExpenses = Object.values(allExpenses).filter(expense => expense.payerId === currUser.id && expense.receiverId === parseInt(friendId) && expense.settled === false)
      const myExpenses = [receiverExpenses, payerExpenses]

      setExpenseSelection(...myExpenses)
    }else {
      const receiverExpenses = Object.values(allExpenses).filter(expense => expense.receiverId === currUser.id)
      const payerExpenses = Object.values(allExpenses).filter(expense => expense.receiverId === parseInt(friendId))
      const myExpenses = [receiverExpenses, payerExpenses]

      setExpenseSelection(...myExpenses)
    }

  }, [friendId])

  useEffect(() => {
    let totalPaid = 0
    const myPayments = Object.values(paymentsMade).filter(payment => payment.expenseId === expense.id)
    if (myPayments.length) {
      myPayments.forEach(payment => totalPaid += payment.amount)
    }
    setAmountDue(expense.amount - totalPaid)
  }, [expense])

  useEffect(() => {
    console.log('========>>>>', amount.indexOf('.') >= 0)
  }, [amount])

  useEffect(() => {
    // TEMP IMPLEMENTATION
    // Should disable submit button based on frontend validations
    setSubmitDisabledStatus(amount === null || paymentDate === null);
  }, [amount, paymentDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setHasSubmitted(true);

    let adjustedAmount = amount
    if (amount.indexOf('.') >= 0) {
      adjustedAmount = parseInt(amount.toString().slice(0, amount.indexOf('.')) + amount.toString().slice(amount.indexOf('.') + 1))
    }


    const addPayment = await dispatch(
      thunkAddPayment({
        userId: currUser.id,
        expenseId: expense.id,
        amount: adjustedAmount,
        paymentDate: `${paymentDate} 00:00:00`,
      })
    );
// do not set to settled if the payment doesnt go through
    if (addPayment && amountDue - amount <= 0) {
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
        navigate(`/friend/${friendId}`);
      })
    }
    setExpense('')
    closeModal();
    navigate(`/friend/${friendId}`);
  };

  return (
    <>
      <h2>Settle up</h2>
      {friendId && expenseSelection.length <= 0
        ? <h3>{`You currently have no expenses with ${currFriend?.name}`}</h3>
        : !friendId && expenseSelection.length <= 0
        ? <h3>All your expenses are settled!</h3>
        :
      <form
        onSubmit={handleSubmit}
        id="settle-up-form"
      >
        <div>
          <div>
            {/* set you and friend name in spans so we can make them clickable to change in the future */}
            <p>Between <span>you</span> and <span>{currFriend.name}</span></p>
          </div>
          <div>
            <label htmlFor='expense'>Which Expense?</label>
            <select
              value={expense ? expense.name : ''}
              onChange={(e) => setExpense(Object.values(allExpenses).find(expense => expense.description === e.target.value))}>
              <option value={''} disabled>Select an expense</option>
              {expenseSelection
                ? expenseSelection.map(expense => (
                  <option key={expense.id} >{expense.description}</option>
                  ))
                : ''}
            </select>

          </div>
          <div className="form-label">
            <label htmlFor="amount">Amount</label>
            {/* {validations.amount && (
              <span className="form-error">{validations.amount}</span>
            )} */}
          </div>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder={expense ? `You owe $${amountDue.toString().slice(0, -2)}.${amountDue.toString().slice(-2)}` : 'amount'}
            required
          />
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
        <div>
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
        </div>
      </form>
      }
    </>
  )
}

export default SettleUpModal;
