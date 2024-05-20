const LOAD_FRIENDS = 'friends/loadFriends';

const loadFriends = (friends) => ({
    type: LOAD_FRIENDS, 
    payload: friends
}); 

export const thunkLoadFriends = () => async (dispatch) => {
    const response = await fetch("/api/friends");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadFriends(data));
    } else {
        return { server: "Something went wrong. Please try again"}
    }
}; 

const initialState = {};

function friendsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_FRIENDS: {
            const newState = {...state}
            action.payload.forEach((friend) => {
                newState[friend.id] = friend
            })
            return newState;
        }

        default:
            return state;
    }
}


export default friendsReducer;