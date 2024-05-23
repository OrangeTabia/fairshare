import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
// import { thunkAddPayments } from "../../../redux/payments";

import './SettleUpModal.css';

function SettleUpModal() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { closeModal } = useModal();

  const [amount, setAmount] = useState(null);
  const [paymentDate, setPaymentDate] = useState(null);
  // const [errors, setErrors] = useState({})
  // const [validations, setValiations] = useState({})
  const [submitClass, setSubmitClass] = useState("form-submit disabled");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  // const [hasSubmitted, setHasSubmitted] = useState(false);

  const setSubmitDisabledStatus = (disabled) => {
    (disabled)
      ? setSubmitClass("form-submit disabled")
      : setSubmitClass("form-submit");
    setSubmitDisabled(disabled);
  };

  useEffect(() => {
    // TEMP IMPLEMENTATION
    // Should disable submit button based on frontend validations
    setSubmitDisabledStatus(amount === null || paymentDate === null);
  }, [amount, paymentDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setHasSubmitted(true);
    window.alert('Submitting WIP')
    closeModal();

    // const serverResponse = await dispatch(
    //   thunkAddPayments({

    //   })
    // );

    // if (serverResponse) {
    //   setErrors(serverResponse);
    // } else {
    //   closeModal();
    //   navigate("/");
    // }
  };

  return (
    <>
      <h2>Settle up</h2>
      <form
        onSubmit={handleSubmit}
        id="settle-up-form"
      >
        <div>
          <div className="form-label">
            <label htmlFor="amount">Amount</label>
            {/* {validations.amount && (
              <span className="form-error">{validations.amount}</span>
            )} */}
          </div>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="amount"
            required
          />
        </div>
        <div>
          <div className="form-label">
            <label htmlFor="payment-date">Payment Date</label>
            {/* {validations.paymentDate && (
              <span className="form-error">{validations.paymentDate}</span>
            )} */}
          </div>
          <input
            id="payment-date"
            type="date"
            value={paymentDate}
            onChange={e => setPaymentDate(e.target.value)}
            placeholder="Payment Date"
            required
          />
        </div>
        <div>
          <div className="form-buttons">
            <button
              className={submitClass}
              disabled={submitDisabled}
            >
              Settle Up
            </button>
            <button className="form-cancel">Cancel</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default SettleUpModal;
