const LOAD_PAYMENTS = "payments/loadPayments";
const ADD_PAYMENT = "payments/addPayment";
const CLEAR_PAYMENTS = "friends/clearPayments";

const loadPayments = ({ payerPayments, receiverPayments }) => ({
  type: LOAD_PAYMENTS,
  payerPayments,
  receiverPayments,
});

const addPayment = (payment) => ({
  type: ADD_PAYMENT,
  payment,
});

export const clearPayments = () => ({
  type: CLEAR_PAYMENTS,
});

export const thunkLoadPayments = () => async (dispatch) => {
  const response = await fetch("/api/payments");
  if (response.ok) {
    const data = await response.json();
    return dispatch(loadPayments(data));
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkAddPayments = (payment) => async (dispatch) => {
  const paymentType = payment.type
  const response = await fetch("/api/payments/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: payment.userId,
      friends_expense_id: payment.expenseId,
      amount: payment.amount,
      payment_date: payment.payment_date,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    data.type = paymentType
    return dispatch(addPayment(data));
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

const initialState = {};

function paymentsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PAYMENTS: {
      const newState = { ...state };
      action.payerPayments.forEach((payment) => {
        payment.type = "payer";
        newState[payment.id] = payment;
      });
      action.receiverPayments.forEach((payment) => {
        payment.type = "receiver";
        newState[payment.id] = payment;
      });
      return newState;
    }
    case ADD_PAYMENT: {
      const newState = { ...state };
      newState[action.payment.id] = action.payment;
      return newState;
    }
    case CLEAR_PAYMENTS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default paymentsReducer;
