// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useModal } from "../../../context/Modal";
import { thunkDeleteFriendsExpense } from "../../../redux/friends_expenses";

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
    closeModal();
  };

  return (
    <div>
      <p>Are you sure you want to remove this expense?</p>
      <div>
        <button onClick={deleteExpense}>Yes</button>
        <button onClick={closeModal}>No</button>
      </div>
    </div>
  );
}

export default DeleteFriendsExpenseModal;
