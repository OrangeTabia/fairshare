import OpenModalButton from "../modals/OpenModalButton/OpenModalButton";
import EditExpenseModal from "../modals/EditExpenseModal";

function ExpenseCard({ expense }) {
  return (
    <ul className={`expense-card ${expense.type}-expense`}>
      {expense.description}
      <OpenModalButton
        id="edit-expense-modal-button"
        className="modal-button"
        buttonText="Edit Expense"
        modalComponent={<EditExpenseModal expense={expense} />}
      />
    </ul>
  );
}

export default ExpenseCard;
