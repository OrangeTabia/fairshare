import { useSelector } from "react-redux";

import FriendCard from "./FriendCard";
import "./FriendsSummary.css";
import { useEffect, useState } from "react";
// import { thunkLoadFriendsExpenses } from "../../redux/friends_expenses";
// import { thunkLoadPayments } from "../../redux/payments";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function FriendsSummary() {
    // const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const friends = useSelector(state => state.friends);
    const friendsExpenses = useSelector(state => state.friendsExpenses);
    const payments = useSelector(state => state.payments);
    const [loading, setLoading] = useState(true)

// A set timeout to give all the functions below a chance to run before rendering the page
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }, [])

    const friendsOwedBy = [];
    const friendsOwedTo = [];

// Adds three columns to each friend expressing how much is owed them, owed by them, ore net amount owed to the user (currently 0)
    Object.values(friends).forEach(friend => {
        friend.netAmount = 0; // From user's perspective (positive -> owes user)
        friend.expensesOwedToUser = [];
        // friend.expensesOwedByUser = []; // not being used
    });

// Adds a column to each expense the user has with the remainingAmount - sets the total expense amount to this column
    Object.values(friendsExpenses).forEach(expense => {
        expense.remainingAmount = expense.amount;
    });

// For each payment, find the expense that the payment is associated with, and reduce the remaining amount column by the payments amount
// I think we are only pulling in the payments the user has made and not all payments
    Object.values(payments).forEach(payment => {
        if (friendsExpenses[payment.expenseId]) {
            friendsExpenses[payment.expenseId].remainingAmount -= payment.amount;
        }
    });


// For each expense, return if the remaining amount is zero
    Object.values(friendsExpenses).forEach(expense => {
        if (expense.remainingAmount === 0) return;

    // if the expenses receiver is the current user:
        if (expense.receiverId === user.id) {
        // find the friend who is the payer of the expense and push the expense to expensesOwedToUser
            friends[expense.payerId].expensesOwedToUser.push(expense);
        // adjust the netAmount on the friend to include the expenses remaining amount
            friends[expense.payerId].netAmount += expense.remainingAmount;
        } else {
        // else find the friend who is the receiver and push the expense to expensesOwedToUser
            friends[expense.receiverId].expensesOwedToUser.push(expense);
        // reduce the netAmount column for the receiving friend by the expenses remaining amount so they know how much they are still owed
            friends[expense.receiverId].netAmount -= expense.remainingAmount;
        }
    });

//
    Object.values(friends).forEach(friend => {
        if (friend.netAmount === 0) {
            return;
        } else if (friend.netAmount > 0) {
            friendsOwedBy.push(friend);
        } else {
            friendsOwedTo.push(friend);
        }
    });

// return the loading screen before returning
    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div className="friends-summary-container">
            <ul className="friends-owed-by">
                {friendsOwedBy.map(friend => (
                    <FriendCard key={friend.id} friend={friend} />  // these are the cards that do not adjust
                ))}
            </ul>
            <ul className="friends-owed-to">
                {friendsOwedTo.map(friend => (
                    <FriendCard key={friend.id} friend={friend} />
                ))}
            </ul>
        </div>
    )
}

export default FriendsSummary;
