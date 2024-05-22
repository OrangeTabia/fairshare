const LOAD_FRIENDS_EXPENSES = 'friends_expenses/loadFriendsExpenses';
const ADD_FRIENDS_EXPENSE = 'friends/addFriendsExpense';
const UPDATE_FRIENDS_EXPENSE = 'friends/updateFriendsExpense';
const DELETE_FRIENDS_EXPENSE = 'friends/deleteFriendsExpense';

const loadFriendsExpenses = (friendsExpenses) => ({
    type: LOAD_FRIENDS_EXPENSES,
    friendsExpenses
});

const addFriendsExpense = (friendsExpense) => ({
    type: ADD_FRIENDS_EXPENSE,
    friendsExpense
});

const deleteFriendsExpense = (friendsExpenseId) => ({
    type: DELETE_FRIENDS_EXPENSE,
    friendsExpenseId
});

export const thunkLoadFriendsExpenses = () => async (dispatch) => {
    const response = await fetch('/api/friends_expenses');
    if (response.ok) {
        const data = await response.json();
        return dispatch(loadFriendsExpenses(data));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const thunkAddFriendsExpense = (expense) => async (dispatch) => {
    const response = await fetch('/api/friends_expenses/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            payer_id: expense.payerId,
            receiver_id: expense.receiverId,
            description: expense.description,
            amount: expense.amount,
            expense_date: expense.expenseDate,
            settled: expense.settled,
            notes: expense.notes
        })
    });
    if (response.ok) {
        const data = await response.json();
        return dispatch(addFriendsExpense(data));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const thunkDeleteFriendsExpense = (friendsExpenseId) => async (dispatch) => {
    const response = await fetch(`/api/friends_expenses/:${friendsExpenseId}/delete`);
    if (response.ok) {
        return dispatch(deleteFriendsExpense(friendsExpenseId));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

const initialState = {};

function friendsExpensesReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_FRIENDS_EXPENSES: {
            const newState = { ...state };
            action.friendsExpenses.forEach((expense) => {
                newState[expense.id] = expense
            });
            return newState;
        }
        case ADD_FRIENDS_EXPENSE: {
            const newState = { ...state };
            newState[action.friendsExpense.id] = action.friendsExpense;
            return newState;
        }
        case DELETE_FRIENDS_EXPENSE: {
            const newState = { ...state };
            delete newState[action.friendsExpenseId];
            return newState;
        }
        default:
            return state;
    }
}


export default friendsExpensesReducer;
