import { useSelector } from "react-redux";

import FriendCard from "./FriendCard";
import "./FriendsSummary.css";

function FriendsSummary() {
    const user = useSelector(state => state.session.user);
    const friends = useSelector(state => state.friends);
    const friendsExpenses = useSelector(state => state.friendsExpenses);
    const payments = useSelector(state => state.payments);

    // May want to add an isLoaded state later to prevent excessive rerendering

    const friendsOwedBy = [];
    const friendsOwedTo = [];

    Object.values(friends).forEach(friend => {
        friend.netAmount = 0; // From user's perspective (positive -> owes user)
        friend.expensesOwedToUser = [];
        friend.expensesOwedByUser = [];
    });

    Object.values(friendsExpenses).forEach(expense => {
        expense.remainingAmount = expense.amount;
    });

    Object.values(payments).forEach(payment => {
        friendsExpenses[payment.expenseId].remainingAmount -= payment.amount;
    });

    Object.values(friendsExpenses).forEach(expense => {
        if (expense.remainingAmount === 0) return;

        if (expense.receiverId === user.id) {
            friends[expense.payerId].expensesOwedToUser.push(expense);
            friends[expense.payerId].netAmount += expense.amount;
        } else {
            friends[expense.receiverId].expensesOwedToUser.push(expense);
            friends[expense.receiverId].netAmount -= expense.remainingAmount;
        }
    });

    Object.values(friends).forEach(friend => {
        if (friend.netAmount === 0) {
            return;
        } else if (friend.netAmount > 0) {
            friendsOwedBy.push(friend);
        } else {
            friendsOwedTo.push(friend);
        }
    });

    return <div className="friends-summary-container">
        <ul className="friends-owed-by">
            {friendsOwedBy.map(friend => (
                <FriendCard key={friend.id} friend={friend} />
            ))}
        </ul>
        <ul className="friends-owed-to">
            {friendsOwedTo.map(friend => (
                <FriendCard key={friend.id} friend={friend} />
            ))}
        </ul>
    </div>
}

export default FriendsSummary;
