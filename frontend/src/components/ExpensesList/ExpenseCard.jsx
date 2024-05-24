import OpenModalButton from "../modals/OpenModalButton/OpenModalButton";
import EditExpenseModal from "../modals/EditExpenseModal";
import "./ExpenseCard.css";

import { HiOutlineX } from "react-icons/hi";
import DeleteFriendsExpenseModal from "../modals/DeleteFriendsExpenseModal";
import AddComment from "../Comments/AddComment";

//className={`expense-card ${expense.type}-expense`}

function ExpenseCard({ expense }) {

  return (
    <div>
      <div className="expense-details-card">
      <span>{expense.description}</span>
      <span>{expense.amount}</span>
      <span>{expense.expenseDate}</span>
      

      <OpenModalButton
        id="delete-expense-modal-button"
        buttonText={<HiOutlineX />}
        modalComponent={<DeleteFriendsExpenseModal expense={expense} />}
      />

      <OpenModalButton
        id="edit-expense-modal-button"
        className="modal-button"
        buttonText="Edit Expense"
        modalComponent={<EditExpenseModal expense={expense} />}
      />
      <br></br>
        <div className="comments-card">
          <AddComment comments={expense.comments} expense={expense}/>
        </div>
      </div>
    </div>
  );
}

export default ExpenseCard;
