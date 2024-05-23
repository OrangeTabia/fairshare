function SettleUpModal() {
    return (
        <>
            <h2>Settle up</h2>
            <form
                // onSubmit={handleSubmit}
                id="settle-up-form"
            >
                <div>
                    <div className="form-label">
                        <input
                            id="amount"
                            type="text"
                            // value={description}
                            placeholder="amount"
                            required
                        />
                    </div>
                    <div className="form-label">
                        <input
                            id="payment_date"
                            type="text"
                            // value={payment_date}
                            placeholder="payment date"
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

export default SettleUpModal;
