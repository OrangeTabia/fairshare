// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useModal } from "../../../context/Modal";
import { thunkDeleteFriendsExpense, thunkLoadFriendsExpenses } from "../../../redux/friends_expenses";
import { thunkLoadPayments } from "../../../redux/payments";
import "./DeleteFriendsExpenseModal";

function DeleteFriendsExpenseModal({ expense }) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  //   const doNotDelete = () => {
  //     //   closeModal();
  //     //   navigate(`/expense/${expense.id}`);
  //   };

  const deleteExpense = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteFriendsExpense(expense.id));
    await dispatch(thunkLoadFriendsExpenses());
    await dispatch(thunkLoadPayments());
    closeModal();
  };

  return (
    <div id="delete-friends-expense">
      <h2>Delete Expense</h2>
      <p>Are you sure you want to remove this expense?</p>
      <div className="form-buttons-container">
        <button onClick={deleteExpense} className="form-submit">Yes</button>
        <button onClick={closeModal} className="form-cancel">No</button>
      </div>
    </div>
  );
}

export default DeleteFriendsExpenseModal;
