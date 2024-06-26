import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../../context/Modal";
import {
  thunkUpdateFriendsExpense,
  thunkLoadFriendsExpenses,
} from "../../../redux/friends_expenses";
import { centsToUSD } from "../../../utils/formatters";
import "./EditExpenseModal.css";

function EditExpenseModal({ expense }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const payer = useSelector((state) => state.friends)[expense.payerId];

  const [description, setDescription] = useState(expense.description);
  const [amount, setAmount] = useState(centsToUSD(expense.amount).slice(1));
  const [notes, setNotes] = useState(expense.notes);

  const [validations, setValidations] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitClass, setSubmitClass] = useState("form-submit");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const originalDate = () => {
    const year = new Date(expense?.expenseDate).getFullYear();
    const month = new Date(expense?.expenseDate).getMonth() + 1; // added + 1 here due to month and date subtracting when read
    const day = new Date(expense?.expenseDate).getDate() + 1; // added + 1 here due to month and date subtracting when read

    let format = `${year}`;

    if (month > 9) format = `${format}-${month}`;
    else format = format + "-0" + String(month);
    if (day > 9) format = `${format}-${day}`;
    else format = format + "-0" + String(day);

    return format;
  };

  const [expenseDate, setExpenseDate] = useState(originalDate);

  // const convertFloatToInteger = () => {
  //   if (!String(amount).split(".").length < 2) {
  //     return String(amount) + "00";
  //   } else if (String(amount).split(".")[1].length === 1) {
  //     return String(amount).split(".").join("") + "0";
  //   } else if (String(amount).split(".")[1].length === 2) {
  //     return String(amount).split(".").join("");
  //   }
  // };

  const setSubmitDisabledStatus = (disabled) => {
    disabled
      ? setSubmitClass("form-submit disabled")
      : setSubmitClass("form-submit");
    setSubmitDisabled(disabled);
  };

  const getValidations = useCallback(() => {
    const newValidations = {};

    if (!description) {
      newValidations.description = "Description is required";
    } else if (description.length > 200) {
      newValidations.description =
        "Description must be less than 200 characters";
    }
    if (amount <= 0) {
      newValidations.amount = "Expense must have a minimum of $0.01";
    }
    if (!expenseDate) {
      newValidations.expenseDate = "Please enter a date for the expense";
    }
    if (notes?.length > 200) {
      newValidations.notes = "Note must be less than 200 characters";
    }
    if (
      String(amount).includes(".") &&
      String(amount).split(".")[1].length > 2
    ) {
      newValidations.amount = "Expense allows only up to 2 decimal places";
    }

    return newValidations;
  }, [description, amount, expenseDate, notes]);

  useEffect(() => {
    if (!hasSubmitted) return;
    const newValidations = getValidations();
    setSubmitDisabledStatus(Object.keys(newValidations).length > 0);
    setValidations(newValidations);
  }, [hasSubmitted, getValidations]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDate = new Date(expenseDate);

    if (!hasSubmitted) {
      setHasSubmitted(true);
      const newValidations = getValidations();
      if (Object.keys(newValidations).length) return;
    }

    let newAmount;
    let currAmount = amount
    let adjustedAmount = '';

    if (currAmount.includes(',')) {
      let amountArray = currAmount.split(',')
      amountArray.forEach(ele => {adjustedAmount += ele})
    } else {
      adjustedAmount = amount
    }

    if (adjustedAmount.indexOf(".") >= 0) {
      newAmount = parseFloat(
        adjustedAmount.toString().slice(0, adjustedAmount.indexOf(".")) +
          adjustedAmount.toString().slice(adjustedAmount.indexOf(".") + 1)

      );
      if (adjustedAmount.toString().slice(adjustedAmount.indexOf(".") + 1).length === 1) {
        newAmount = parseFloat(adjustedAmount.toString() + "0");
      }
    } else {
      newAmount = parseInt(adjustedAmount.toString() + "00");
    }

    const updatedExpense = {
      payerId: expense.payerId,
      receiverId: expense.receiverId,
      description,
      amount: newAmount,
      expenseDate: newDate,
      settled: false,
      notes,
    };

    await dispatch(thunkUpdateFriendsExpense(expense.id, updatedExpense));
    await dispatch(thunkLoadFriendsExpenses());
    closeModal();
  };

  return (
    <>
      <h2>Edit an Expense</h2>
      <form onSubmit={handleSubmit} id="edit-expense-form">
        <div className="form-item">
          <p>Between you and
            <span className="payer-name"> {payer?.name}</span>
          </p>
        </div>

        <div className="form-label">
          <label htmlFor="description">Describe the expense</label>
          {validations.description && hasSubmitted && (
            <span className="form-error">{validations.description}</span>
          )}
        </div>
        <div className="form-item">
          <input
            id="description"
            type="text"
            value={description}
            placeholder="Enter a description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-label">
          <label htmlFor="amount">Change the amount</label>
          {validations.amount && hasSubmitted && (
            <span className="form-error">{validations.amount}</span>
          )}
        </div>
        <div className="form-item">
          $
          <input
            id="amount"
            type="text"
            value={amount}
            placeholder="0.00"
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-label">
          <label htmlFor="expense-date">Modify the date</label>
          {validations.expenseDate && hasSubmitted && (
            <span className="form-error">{validations.expenseDate}</span>
          )}
        </div>
        <div className="form-item">
          <input
            id="expense-date"
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            required
            />
        </div>

        <div className="form-label">
          <label htmlFor="notes">Edit additional notes</label>
          {validations.notes && hasSubmitted && (
            <span className="form-error">{validations.notes}</span>
          )}
        </div>
        <div className="form-item">
          <input
            id="notes"
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="form-buttons-container">
          <button className={submitClass} disabled={submitDisabled}>
            Save
          </button>
          <button className="form-cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default EditExpenseModal;
