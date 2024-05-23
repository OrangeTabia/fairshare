function ExpenseCard({ expense }) {
  return (
    <ul className={`expense-card ${expense.type}-expense`}>
      {expense.description}
    </ul>
  )
}

export default ExpenseCard;
