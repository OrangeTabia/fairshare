import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
// import { thunkAddPayments } from "../../../redux/payments";
import { useParams } from "react-router-dom";

import './SettleUpModal.css';
import { useSelector } from "react-redux";

function SettleUpModal() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { closeModal } = useModal();
  const { friendId } = useParams();

  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [expense, setExpenses] = useState('')
  const [expenseSelection, setExpenseSelection] = useState([])
  // const [errors, setErrors] = useState({})
  // const [validations, setValiations] = useState({})
  const [submitClass, setSubmitClass] = useState("form-submit disabled");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  // const [hasSubmitted, setHasSubmitted] = useState(false);
  const allExpenses = useSelector(state => state.friendsExpenses)
  const currUser = useSelector(state => state.session.user)

  const setSubmitDisabledStatus = (disabled) => {
    (disabled)
      ? setSubmitClass("form-submit disabled")
      : setSubmitClass("form-submit");
    setSubmitDisabled(disabled);
  };

  useEffect(() => {
    if (friendId) {
      const receiverExpenses = Object.values(allExpenses).map(expense => expense.payerId === parseInt(friendId) && expense.receiverId === currUser.id)
      const payerExpenses = Object.values(allExpenses).map(expense => expense.payerId === currUser.id && expense.receiverId === parseInt(friendId))
      const myExpenses = [...receiverExpenses, ...payerExpenses]
      setExpenseSelection(...myExpenses)
    } else {
      const receiverExpenses = Object.values(allExpenses).map(expense => expense.receiverId === currUser.id)
      const payerExpenses = Object.values(allExpenses).map(expense => expense.receiverId === parseInt(friendId))
      const myExpenses = [...receiverExpenses, ...payerExpenses]
      setExpenseSelection(...myExpenses)
    }

  }, [friendId])

  useEffect(() => {
    // TEMP IMPLEMENTATION
    // Should disable submit button based on frontend validations
    setSubmitDisabledStatus(amount === null || paymentDate === null);
  }, [amount, paymentDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setHasSubmitted(true);
    window.alert('Submitting WIP')
    closeModal();

    // const serverResponse = await dispatch(
    //   thunkAddPayments({

    //   })
    // );

    // if (serverResponse) {
    //   setErrors(serverResponse);
    // } else {
    //   closeModal();
    //   navigate("/dashboard");
    // }
  };

  return (
    <>
      <h2>Settle up</h2>
      <form
        onSubmit={handleSubmit}
        id="settle-up-form"
      >
        <div>
          <div>
            <label htmlFor='expense'>Which Expense?</label>
            {console.log(expenseSelection)}
            <select
              value={expense}
              onChange={(e) => e.target.value}>
              <option value={''} disabled>Select an expense</option>
              {expenseSelection ? expenseSelection.map(expense => (
                <option key={expense.id} >{expense.description}</option>
              )) : ''}
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
            placeholder="amount"
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
            >
              Settle Up
            </button>
            <button className="form-cancel">Cancel</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default SettleUpModal;
