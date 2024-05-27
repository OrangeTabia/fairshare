import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkAddFriendsExpense, thunkLoadFriendsExpenses } from "../../../redux/friends_expenses";
import { useParams } from "react-router-dom";
import './AddExpenseModal.css'

function AddExpenseModal({ friendName }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { friendId } = useParams();

  const currentUser = useSelector((state) => state.session.user);
  const friendsList = useSelector((state) => state.friends);
  const friendsListArray = Object.values(friendsList);

  const [payer, setPayer] = useState(""); // payer owes current user money
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [notes, setNotes] = useState("");

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

  const getIntegerAmount = () => {
    if (!amount.split(".")[1]) {
      return amount + "00";
    } else if (amount.split(".")[1].length === 1) {
      return amount.split(".").join("") + "0";
    } else if (amount.split(".")[1].length === 2) {
      return amount.split(".").join("");
    }
  };

  useEffect(() => {
    if (friendName) {
      let selectedFriend = friendsListArray.find(friend => friend.id === parseInt(friendId))
      setPayer(selectedFriend.id)
    }
  }, [friendName, friendsListArray, friendId])

  const getValidations = useCallback(() => {
    const newValidations = {};

    if (!payer) {
      newValidations.payer = "Payer is required";
    }
    if (!description) {
      newValidations.description = "Description is required";
    } else if (description.length > 200) {
      newValidations.description = "Description must be less than 200 characters";
    }
    if (amount <= 0) {
      newValidations.amount = "Amount must be at least $0.01";
    }
    if (!expenseDate) {
      newValidations.expenseDate = "Please enter an expense date";
    }
    if (notes.length > 200){
      newValidations.notes = "Notes must be less than 200 characters";
    }

    return newValidations;
  }, [payer, description, amount, expenseDate, notes]);

  useEffect(() => {
    if (!hasSubmitted) return;
    const newValidations = getValidations();
    setSubmitDisabledStatus(Object.keys(newValidations).length > 0);
    setValidations(newValidations);
  }, [hasSubmitted, getValidations]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Store todays date and update the submitted state
    const newDate = new Date(expenseDate);

    if (!hasSubmitted) {
      setHasSubmitted(true);
      const newValidations = getValidations();
      if (Object.keys(newValidations).length) return;
    }

    // Request to make a new friends expense and then load the new state with the expense + comments
    const newExpense = {
      payerId: payer,
      receiverId: currentUser.id,
      description,
      amount: getIntegerAmount(),
      expenseDate: newDate,
      settled: false,
      notes,
    };
    await dispatch(thunkAddFriendsExpense(newExpense));
    await dispatch(thunkLoadFriendsExpenses());
    closeModal();
  };

  return (
    <>
      <h2>Add an expense</h2>
      <form onSubmit={handleSubmit} id="add-expense-form">
        <div>
          <div className="form-label">
          {friendName ? <span >With you and: <span id="add-expense-name">{friendName}</span></span> :
            <select
              id="payer"
              value={payer}
              onChange={(e) => setPayer(e.target.value)}
              required
            > 
              <option value={''} disabled>Select a Friend</option>
              {friendsListArray.map((friend) => (
                <option value={friend.id} key={friend.id}>
                  {friend.name}
                </option>
              ))}
            </select>
            }
            {validations.payer && (
              <span className="form-error">{validations.payer}</span>
            )}
          </div>
          <br></br>
          <div className="form-label">
            <input
              id="description"
              type="text"
              value={description}
              placeholder="Enter a description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            {validations.description && (
              <span className="form-error">{validations.description}</span>
            )}
          </div>
          <div className="form-label">
            $
            <input
              id="amount"
              type="text"
              value={amount}
              placeholder="amount"
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            {validations.amount && (
              <span className="form-error">{validations.amount}</span>
            )}
          </div>
          <div className="form-label">
            <input
              id="expense_date"
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              required
            />
            {validations.expenseDate && (
              <span className="form-error">{validations.expenseDate}</span>
            )}
          </div>
          <div className="form-label">
            <input
              id="notes"
              placeholder="Leave a note!"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            {validations.notes && (
              <span className="form-error">{validations.notes}</span>
            )}
          </div>
          <div className="submit-cancel-btns">
            <button
              className={submitClass}
              disabled={submitDisabled}
            >
              Save
            </button>
            <button
              className="form-cancel"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddExpenseModal;
