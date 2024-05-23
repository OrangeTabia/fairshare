const LOAD_USERS = 'users/loadUsers';

const loadAllUsers = ({users}) => ({
    type: LOAD_USERS,
    users
});


export const thunkLoadAllUsers = () => async (dispatch) => {
    const response = await fetch('/api/users');
    if (response.ok) {
        const data = await response.json();
        return dispatch(loadAllUsers(data));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

const initialState = {};

function allUsersReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USERS: {
            const newState = {...state};
            action.users.forEach((user) => {
                newState[user.id] = user
            });
            return newState;
        }
        default:
            return state;
    }
}

export default allUsersReducer;
