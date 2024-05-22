import { thunkLoadFriends } from "../redux/friends";
import { thunkLoadFriendsExpenses } from "../redux/friends_expenses";
import { thunkLoadPayments } from "../redux/payments";

const loadState = async (dispatch) => {
  await dispatch(thunkLoadFriends());
  await dispatch(thunkLoadFriendsExpenses());
  await dispatch(thunkLoadPayments());
};

export default loadState;
