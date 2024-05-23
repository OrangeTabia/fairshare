const LOAD_FRIENDS_EXPENSES = "friends_expenses/loadFriendsExpenses";
const ADD_FRIENDS_EXPENSE = "friends/addFriendsExpense";
const DELETE_FRIENDS_EXPENSE = "friends/deleteFriendsExpense";
const ADD_COMMENT = "comments/addComment";
const DELETE_COMMENT = "comments/deleteComment";
const CLEAR_FRIENDS_EXPENSES = "friends/clearFriendsExpenses";

const loadFriendsExpenses = ({
  payerFriendsExpenses,
  receiverFriendsExpenses,
}) => ({
  type: LOAD_FRIENDS_EXPENSES,
  payerFriendsExpenses,
  receiverFriendsExpenses,
});

const addFriendsExpense = (friendsExpense) => ({
  type: ADD_FRIENDS_EXPENSE,
  friendsExpense,
});

const deleteFriendsExpense = (friendsExpenseId) => ({
  type: DELETE_FRIENDS_EXPENSE,
  friendsExpenseId,
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

const deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  comment,
});

export const clearFriendsExpenses = () => ({
  type: CLEAR_FRIENDS_EXPENSES,
});

export const thunkLoadFriendsExpenses = () => async (dispatch) => {
  const response = await fetch("/api/friends_expenses");
  if (response.ok) {
    const data = await response.json();
    return dispatch(loadFriendsExpenses(data));
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const thunkAddFriendsExpense = (expense) => async (dispatch) => {
  const paymentType = expense.type
  const response = await fetch("/api/friends_expenses/new", {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      payer_id: expense.payerId,
      receiver_id: expense.receiverId,
      description: expense.description,
      amount: expense.amount,
      expense_date: expense.expenseDate,
      settled: expense.settled,
      notes: expense.notes,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    data.type = paymentType
    dispatch(addFriendsExpense(data));
    return data;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const thunkUpdateFriendsExpense =
  (expenseId, expense) => async (dispatch) => {
    const paymentType = expense.type
    const response = await fetch(`/api/friends_expenses/${expenseId}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payer_id: expense.payerId,
        receiver_id: expense.receiverId,
        description: expense.description,
        amount: expense.amount,
        expense_date: expense.expenseDate,
        settled: expense.settled,
        notes: expense.notes,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      data.type = paymentType
      return dispatch(addFriendsExpense(data));
    } else {
      const errors = await response.json();
      return errors;
    }
  };

export const thunkDeleteFriendsExpense =
  (friendsExpenseId) => async (dispatch) => {
    const response = await fetch(
      `/api/friends_expenses/${friendsExpenseId}/delete`
    );
    if (response.ok) {
      return dispatch(deleteFriendsExpense(friendsExpenseId));
    } else {
      const errors = await response.json();
      return errors;
    }
  };

export const thunkAddComment = (comment) => async (dispatch) => {
  const response = await fetch("/api/comments/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: comment.userId,
      friends_expense_id: comment.friendsExpenseId,
      comment: comment.comment,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return dispatch(addComment(data));
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const thunkUpdateComment = (comment) => async (dispatch) => {
  const response = await fetch(`/api/comments/${comment.id}/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: comment.userId,
      friends_expense_id: comment.friendsExpenseId,
      comment: comment.comment,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return dispatch(addComment(data));
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const thunkDeleteComment = (comment) => async (dispatch) => {
  const response = await fetch(`/api/comments/${comment.id}/delete`);
  if (response.ok) {
    return dispatch(deleteComment(comment.id));
  } else {
    const errors = await response.json();
    return errors;
  }
};

const initialState = {};

function friendsExpensesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FRIENDS_EXPENSES: {
      const newState = { ...state };
      action.payerFriendsExpenses.forEach((expense) => {
        expense.type = "payer";
        newState[expense.id] = expense;
      });
      action.receiverFriendsExpenses.forEach((expense) => {
        expense.type = "receiver";
        newState[expense.id] = expense;
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
    case ADD_COMMENT: {
      const newState = { ...state };
      newState[action.comment.friendsExpenseId].comments.push(action.comment);
      return newState;
    }
    case DELETE_COMMENT: {
      const newState = { ...state };
      delete newState[action.comment.friendsExpenseId].comments.find(
        (e) => e.id == action.comment.id
      );
      return newState;
    }
    case CLEAR_FRIENDS_EXPENSES: {
      return initialState;
    }
    default:
      return state;
  }
}

export default friendsExpensesReducer;
