import { thunkLoadFriends } from "../redux/friends";
import { thunkLoadFriendsExpenses } from "../redux/friends_expenses";
import { thunkLoadPayments } from "../redux/payments";
import { thunkLoadAllUsers } from "../redux/all_users";

const loadState = async (dispatch) => {
  await dispatch(thunkLoadFriends());
  await dispatch(thunkLoadFriendsExpenses());
  await dispatch(thunkLoadPayments());
  await dispatch(thunkLoadAllUsers());
};

export default loadState;
