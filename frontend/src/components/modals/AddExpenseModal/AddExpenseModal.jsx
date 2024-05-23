

function AddExpenseModal() {
    return (
        <>
            <h2>Add an expense</h2>
            <form
                // onSubmit={handleSubmit}
                id="add-expense-form"
            >
                <div>
                    <div className="form-label">
                        <input
                            id="description"
                            type="text"
                            // value={description}
                            placeholder="Enter a description"
                            required
                        />
                    </div>
                    <div className="form-label">
                        <input
                            id="amount"
                            type="text"
                            // value={amount}
                            placeholder="0.00"
                            required
                        />
                    </div>
                    <div className="form-label">
                        <input
                            id="expense_date"
                            type="date"
                            // value={expense_date}
                            required
                        />
                    </div>

                    <div>
                        <button className="form-cancel">Cancel</button>
                        <button className="form-submit">Save</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddExpenseModal;
