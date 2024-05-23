import "./SecondaryNavigation.css";

function SecondaryNavigation({ pageTitle }) {
    return (
        <header id="secondary-nav-header">
            <h1 id="page-title">{pageTitle}</h1>
            <nav>
                <button
                id="add-expense-modal-button"
                className="modal-button"
                >
                    Add Expense Modal
                </button>
                <button
                id="settle-up-modal-button"
                className="modal-button"
                >
                    Settle Up Modal
                </button>
            </nav>
        </header>
    )
}

export default SecondaryNavigation;
