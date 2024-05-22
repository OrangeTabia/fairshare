const ADD_COMMENT = 'comments/addComment'; 
const DELETE_COMMENT = 'comments/deleteComment'; 


const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
});

const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment
});


export const thunkAddComment = (comment) => async (dispatch) => {
    const response = await fetch('/api/comments/new', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: comment.userId,
            friends_expense_id: comment.friendsExpenseId,
            comment: comment.comment
        })
    }); 
    if (response.ok) {
        const data = await response.json();
        return dispatch(addComment(data));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const thunkUpdateComment = (commentId, comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}/update`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({
            user_id: comment.userId,
            friends_expense_id: comment.friendsExpenseId,
            comment: comment.comment
        })
    }); 
    if (response.ok) {
        const data = await response.json();
        return dispatch(addComment(data));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const thunkDeleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}/delete`); 
    if (response.ok) {
        return dispatch(deleteComment(commentId)); 
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};


const initialState = {};

function commentsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_COMMENT: {
            const newState = { ...state };
            newState[action.comment.id] = action.comment;
            return newState;
        }
        case DELETE_COMMENT: {
            const newState = { ...state };
            delete newState[action.commentId]
        }
        default: 
            return state;
    }
}


export default commentsReducer;


