import OpenModalButton from "../modals/OpenModalButton/OpenModalButton";
import EditExpenseModal from "../modals/EditExpenseModal";
import './ExpenseCard.css'

//className={`expense-card ${expense.type}-expense`}

function ExpenseCard({ expense }) {
  return (
    <div className="expense-details-card">

      <span>{expense.description}</span>
      <span>{expense.amount}</span>
      <span>{expense.expenseDate}</span>
      <OpenModalButton
        id="edit-expense-modal-button"
        className="modal-button"
        buttonText="Edit Expense"
        modalComponent={<EditExpenseModal expense={expense} />}
      />
    </div>
  )
}

export default ExpenseCard;
