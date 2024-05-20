const LOAD_FRIENDS = 'friends/loadFriends';

const loadFriends = (friends) => ({
    type: LOAD_FRIENDS, 
    payload: friends
}); 

export const thunkLoadFriends = () => async (dispatch) => {
    const response = await fetch("/api/friends");
    const data = await response.json();
    dispatch(loadFriends(data));
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