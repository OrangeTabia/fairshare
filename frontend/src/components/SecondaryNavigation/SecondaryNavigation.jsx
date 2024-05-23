import "./SecondaryNavigation.css";
import OpenModalButton from "../modals/OpenModalButton/OpenModalButton";
import AddExpenseModal from "../modals/AddExpenseModal/AddExpenseModal";
import SettleUpModal from "../modals/SettleUpModal/SettleUpModal"; 

function SecondaryNavigation({ pageTitle }) {
    return (
        <header id="secondary-nav-header">
            <h1 id="page-title">{pageTitle}</h1>
            <nav>
                <OpenModalButton
                buttonText="Add Expense"
                modalComponent={<AddExpenseModal />}
                id="add-expense-modal-button"
                className="modal-button"
                />

                <OpenModalButton
                buttonText="Settle Up"
                modalComponent={<SettleUpModal />}
                id="settle-up-modal-button"
                className="modal-button"
                />
            </nav>
        </header>
    )
}

export default SecondaryNavigation;
