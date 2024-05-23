import './ExpenseCard.css'

function ExpenseCard({ expense }) {
  return (
    <div className="expense-details-card">
      <span>{expense.description}</span>
      <span>{expense.amount}</span>
      <span>{expense.expenseDate}</span>
    </div>
  )
}

export default ExpenseCard;
