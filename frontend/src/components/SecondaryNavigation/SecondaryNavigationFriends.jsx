import "./SecondaryNavigation.css";
import OpenModalButton from "../modals/OpenModalButton/OpenModalButton";
import AddExpenseModal from "../modals/AddExpenseModal/AddExpenseModal";
import SettleUpFriendModal from "../modals/SettleUpModal/SettleUpFriendModal";

function SecondaryNavigation({ pageTitle, profileImage }) {
    return (
        <header id="secondary-nav-header">
            {profileImage ?
                <div className="title-with-profile-image">
                    <img className='profile-image' src={profileImage} />
                    <h1 id="page-title">{pageTitle}</h1>
                </div>
                 :
                <h1 id="page-title">{pageTitle}</h1>
            }
            <nav>
              <div className="secondary-nav-buttons">
                <OpenModalButton
<<<<<<< HEAD
                  buttonText="Add Expense"
                  modalComponent={<AddExpenseModal friendName={pageTitle}/>}
                  id="add-expense-modal-button"
                  className="modal-button"
                  />
                  <OpenModalButton
                    buttonText="Settle Up"
                    modalComponent={<SettleUpFriendModal />}
                    id="settle-up-modal-button"
                    className="modal-button"
                  />
              </div>
            </nav>
=======
                buttonText="Add Expense"
                modalComponent={<AddExpenseModal friendName={pageTitle}/>}
                id="add-expense-modal-button"
                // className="modal-button"
                />

        <OpenModalButton
          buttonText="Settle Up"
          modalComponent={<SettleUpFriendModal />}
          id="settle-up-modal-button"
          // className="modal-button"
        />
      </nav>
>>>>>>> landing
    </header>
  );
}

export default SecondaryNavigation;
