const LOAD_PAYMENTS = 'payments/loadPayments';
const ADD_PAYMENT = 'payments/addPayment'; 


const loadPayments = (payments) => ({
    type: LOAD_PAYMENTS,
    payments
});

const addPayment = (payment) => ({
    type: ADD_PAYMENT,
    payment
});


export const thunkLoadPayments = () => async (dispatch) => {
    const response = await fetch('/api/payments');
    if (response.ok) {
        const data = await response.json();
        return dispatch(loadPayments(data));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const thunkAddPayments = (payment) => async (dispatch) => {
    const response = await fetch('/api/payments/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: payment.userId,
            friends_expense_id: payment.expenseId,
            amount: payment.amount,
            payment_date: payment.payment_date
        })
    });
    if (response.ok) {
        const data = await response.json();
        return dispatch(addPayment(data))
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}; 


const initialState = {};

function paymentsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PAYMENTS: {
            const newState = { ...state };
            action.payments.forEach((payment) => {
                newState[payment.id] = payment;
            });
            return newState;
        }
        case ADD_PAYMENT: {
            const newState = { ...state };
            newState[action.payment.id] = action.payment;
            return newState;
        }
        default: 
            return state;
    }
}


export default paymentsReducer