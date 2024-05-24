import OpenModalButton from "../modals/OpenModalButton/OpenModalButton";
import EditExpenseModal from "../modals/EditExpenseModal";
// import "./ExpenseCard.css";

import { HiOutlineX } from "react-icons/hi";
import DeleteFriendsExpenseModal from "../modals/DeleteFriendsExpenseModal";
import AddComment from "../Comments/AddComment";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { PiToiletPaperLight } from "react-icons/pi";


function FriendsExpenseCard({ expenseId }) {

  const currUser = useSelector(state => state.session.user)

  const expense = useSelector(state => state.friendsExpenses[parseInt(expenseId)])
  const payments = useSelector(state => Object.values(state.payments))
  const [amountDue, setAmountDue] = useState('')

  useEffect(() => {
    const currPayments = payments.filter(payment => payment.userId === currUser.id && payment.expenseId === expenseId)
    let total = 0;

    currPayments.forEach(payment => total += payment.amount)
    let adjustTotal = (expense.amount - total).toString()
    let due = '$' + adjustTotal.slice(0, -2) + '.' + adjustTotal.slice(-2)
    setAmountDue(due)

  }, [])

  return (
    <div className="expense-details-card">
      <div className="details-header">
        <span>{amountDue.length <= 3 ? `This expense is all paid up` : `You still owe: ${amountDue}`}</span>
      </div>

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
        {expense.comments ? <div className="comments-card">
          <AddComment comments={expense.comments} expense={expense}/>
        </div>
        : '' }
    </div>
  );
}

export default FriendsExpenseCard;
