import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { centsToUSD, removeDecimals } from "../../../utils/formatters";
import { useModal } from "../../../context/Modal";
import { thunkAddPayment } from "../../../redux/payments";
import {
  thunkLoadFriendsExpenses,
  thunkUpdateFriendsExpense,
} from "../../../redux/friends_expenses";
import "./SettleUpModal.css";

function SettleUpFriendModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const { friendId } = useParams();

  const allExpenses = useSelector((state) => state.friendsExpenses);
  const currUser = useSelector((state) => state.session.user);
  const currFriend = useSelector(
    (state) => state.userEmails[parseInt(friendId)]
  );
  const paymentsMade = useSelector((state) => state.payments);

  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [expense, setExpense] = useState("");
  const [expenseSelection, setExpenseSelection] = useState([]);
  const [amountDue, setAmountDue] = useState(0);
  const [chosenExpense, setChosenExpense] = useState("");

  const [validations, setValidations] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitClass, setSubmitClass] = useState("form-submit");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  console.log({
    date: new Date(Date.now()),
    format: new Date(Date.now()).toISOString().split("T")[0],
  });

  const setSubmitDisabledStatus = (disabled) => {
    disabled
      ? setSubmitClass("form-submit disabled")
      : setSubmitClass("form-submit");
    setSubmitDisabled(disabled);
  };

  const getValidations = useCallback(() => {
    const newValidations = {};
    // const date = new Date(paymentDate);
    // const today = new Date();

    if (parseInt(removeDecimals(amount)) <= 0) {
      newValidations.amount = "Payment must be more than 0";
    }
    if (removeDecimals(amount) > amountDue) {
      newValidations.amount =
        "Payment must be the same or less than what is owed";
    }
    const date = new Date(paymentDate.split("-").join(" "));
    const today = new Date(Date.now());

    date.setHours(1);
    date.setMinutes(10);
    date.setMilliseconds(1);
    today.setHours(1);
    today.setMinutes(1);
    today.setMilliseconds(1);

    if (date < today) {
      newValidations.paymentDate = "Payment date must be in the future";
    }
    return newValidations;
  }, [amount, amountDue, paymentDate]);

  useEffect(() => {
    if (!hasSubmitted) return;
    const newValidations = getValidations();
    setSubmitDisabledStatus(Object.keys(newValidations).length);
    setValidations(newValidations);
  }, [hasSubmitted, getValidations]);

  useEffect(() => {
    if (friendId) {
      const payerExpenses = Object.values(allExpenses).filter((expense) => {
        return (
          expense.payerId === currUser.id &&
          expense.receiverId === parseInt(friendId) &&
          expense.settled === false
        );
      });
      setExpenseSelection(payerExpenses);
    }
  }, [friendId, allExpenses, expense, currUser]);

  useEffect(() => {
    const findExpense = Object.values(allExpenses).find(
      (thisExpense) => thisExpense.id === parseInt(expense)
    );
    setChosenExpense(findExpense);
  }, [allExpenses, expense]);

  useEffect(() => {
    let totalPaid = 0;
    // const currExpense = Object.values(allExpenses).find(thisExpense => thisExpense.id === parseInt(expense))
    const myPayments = Object.values(paymentsMade).filter(
      (payment) => payment.expenseId === parseInt(expense)
    );
    if (myPayments.length) {
      myPayments.forEach((payment) => (totalPaid += payment.amount));
    }
    if (chosenExpense) {
      setAmountDue(chosenExpense.amount - totalPaid);
    }
  }, [expense, paymentsMade, chosenExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasSubmitted) {
      setHasSubmitted(true);
      const newValidations = getValidations();
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
    // will go through if the above goes through.  add validations
    if (amountDue - adjustedAmount <= 0) {
      const newDate = new Date(chosenExpense.expenseDate);

      const settledExpense = {
        payerId: chosenExpense.payerId,
        receiverId: chosenExpense.receiverId,
        description: chosenExpense.description,
        amount: chosenExpense.amount,
        expenseDate: newDate,
        settled: true,
        notes: chosenExpense.notes,
      };

      await dispatch(
        thunkUpdateFriendsExpense(chosenExpense.id, settledExpense)
      ).then(() => {
        setExpense("");
        closeModal();
        navigate(`/friend/${friendId}`);
      });
      await dispatch(thunkLoadFriendsExpenses());
    }
    setExpense("");
    closeModal();
    navigate(`/friend/${friendId}`);
  };

  return (
    <>
      <h2>Settle up</h2>
      {friendId && expenseSelection.length <= 0 ? (
        <h3>{`You do not currently owe ${currFriend?.name} any money`}</h3>
      ) : !friendId && expenseSelection.length <= 0 ? (
        <h3>All your expenses are settled!</h3>
      ) : (
        <form onSubmit={handleSubmit} id="settle-up-form">
          <div>
            <div>
              {/* set you and friend name in spans so we can make them clickable to change in the future */}
              <p>
                Between <span>you</span> and <span>{currFriend.name}</span>
              </p>
            </div>
            <div>
              <label htmlFor="expense">Which Expense?&nbsp;&nbsp;&nbsp;</label>
              <select
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
              >
                <option value={""} disabled>
                  Select an expense
                </option>
                {expenseSelection.map((expense) => (
                  <option key={expense.id} value={expense.id}>
                    {expense.description}
                  </option>
                ))}
              </select>
            </div>
            <br></br>
            <div className="form-label">
              <label htmlFor="amount"></label>
              {validations.amount && (
                <span className="form-error">{validations.amount}</span>
              )}
            </div>
            <div className="dollarsign-for-amount">
              <div>$</div>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={
                  expense ? `You owe ${centsToUSD(amountDue)}` : "amount"
                }
                required
              />
            </div>
          </div>
          <div>
            <div className="form-label">
              <label htmlFor="payment-date">Payment Date</label>
              {validations.paymentDate && (
                <span className="form-error">{validations.paymentDate}</span>
              )}
            </div>
            <input
              id="payment-date"
              type="date"
              value={paymentDate}
              min={new Date(Date.now()).toISOString().split("T")[0]}
              onChange={(e) => setPaymentDate(e.target.value)}
              placeholder="Payment Date"
              required
            />
          </div>
          <div>
            <div className="form-buttons">
              <button
                className={submitClass}
                disabled={submitDisabled}
                type="submit"
              >
                Settle Up
              </button>
              <button className="form-cancel" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default SettleUpFriendModal;
