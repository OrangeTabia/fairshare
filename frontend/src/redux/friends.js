const LOAD_FRIENDS = 'friends/loadFriends';
const ADD_FRIEND = 'friends/addFriend';
const DELETE_FRIEND = 'friends/deleteFriend';
const CLEAR_FRIENDS = 'friends/clearFriends';

const loadFriends = (friends) => ({
    type: LOAD_FRIENDS,
    friends
});

const addFriend = (friend) => ({
    type: ADD_FRIEND,
    friend
});

const deleteFriend = (friendId) => ({
    type: DELETE_FRIEND,
    friendId
});

export const clearFriends = () => ({
    type: CLEAR_FRIENDS
});


export const thunkLoadFriends = () => async (dispatch) => {
    const response = await fetch('/api/friends');
    if (response.ok) {
        const data = await response.json();
        return dispatch(loadFriends(data));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const thunkAddFriend = (friendEmail) => async (dispatch) => {
    const response = await fetch('/api/friends/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: friendEmail })
    });
    if (response.ok) {
        const data = await response.json();
        return dispatch(addFriend(data));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const thunkDeleteFriend = (friendId) => async (dispatch) => {
    const response = await fetch(`/api/friends/${friendId}/delete`);
    if (response.ok) {
        return dispatch(deleteFriend(friendId));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

const initialState = {};

function friendsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_FRIENDS: {
            const newState = { ...state };
            action.friends.forEach((friend) => {
                newState[friend.id] = friend
            });
            return newState;
        }
        case ADD_FRIEND: {
            const newState = { ...state };
            newState[action.friend.id] = action.friend;
            return newState;
        }
        case DELETE_FRIEND: {
            const newState = { ...state };
            delete newState[action.friendId];
            return newState;
        }
        case CLEAR_FRIENDS: {
            return initialState;
        }
        default:
            return state;
    }
}


export default friendsReducer;
