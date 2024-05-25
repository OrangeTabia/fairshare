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
  // Store an ID instead of storing an empty string
  const [selectedExpenseId, setExpense] = useState(null)
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

  // console.log("PAYER EXPENSES", payerExpenses); 

  
  // Select our expense from all of the expenses and then find the receiving friend 
  let selectedExpense = payerExpenses.find((expense) => expense.id == selectedExpenseId);
  let receiver = friendsArray.find((friend) => friend.id == selectedExpense?.receiverId);

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
    const payerExpensesList = Object.values(allExpenses).filter((expense) => expense.payerId === currUser.id && expense.settled === false);
    setExpenseSelection(payerExpensesList)
  }, [allExpenses])

  // Storing all of my payments
  useEffect(() => {
    let totalPaid = 0
    const myPayments = Object.values(paymentsMade).filter(payment => payment.expenseId === selectedExpense?.id)
    if (myPayments.length) {
      myPayments.forEach(payment => totalPaid += payment.amount)
    }
    setAmountDue(selectedExpense?.amount - totalPaid)
  }, [selectedExpense, paymentsMade])

  useEffect(() => {
    // TEMP IMPLEMENTATION
    // Should disable submit button based on frontend validations
    setSubmitDisabledStatus(amount === null || paymentDate === null);
  }, [amount, paymentDate]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(Object.values(errors).length) {
      setErrors('')
      return;
    }
    setHasSubmitted(false)

    let adjustedAmount = amount;

    if (amount.indexOf('.') >= 0) {
      adjustedAmount = parseInt(amount.toString().slice(0, amount.indexOf('.')) + amount.toString().slice(amount.indexOf('.') + 1))
    }

    let addPayment = await dispatch(
      thunkAddPayment({
        userId: currUser.id,
        expenseId: selectedExpense?.id,
        amount: adjustedAmount,
        paymentDate: `${paymentDate} 00:00:00`,
      })
    );

    console.log("ERRORS", addPayment.errors)

    if (!addPayment.errors && amountDue - amount <= 0) {
      const newDate = new Date(selectedExpense.expenseDate);

      const settledExpense = {
        payerId: selectedExpense.payerId,
        receiverId: selectedExpense.receiverId,
        description: selectedExpense.description,
        amount: selectedExpense?.amount,
        selectedExpense: newDate,
        settled: true,
        notes: selectedExpense.notes,
      }


      await dispatch(
        thunkUpdateFriendsExpense(selectedExpense?.id, settledExpense)
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
              value={selectedExpenseId}
              placeholder={'Select an expense'}
              defaultValue={'Select an expense'}
              onChange={(e) => {
                setExpense(e.target.value)
              }
            }
            >
              {
              // This is the null state, there is no way to get back to it since it's disabled
              }
              <option value={null} disabled>Select an expense</option>
              {payerExpenses?.map((expense) => {
                  let expenseLabel = `${expense.description}`;
                  return (
                    // We must make the value the ID of the expense since these will be unique across many 'similar' named payments
                  <option 
                    key={expense.id}
                    value={expense.id} 
                    label={expenseLabel}
                  />)
                }
              )
              }
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
              placeholder={selectedExpense ? `You owe $${amountDue.toString().slice(0, -2)}.${amountDue.toString().slice(-2)}` : 'amount'}
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
