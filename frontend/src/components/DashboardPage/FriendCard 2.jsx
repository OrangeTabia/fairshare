import { centsToUSD } from "../../utils/formatters";
import "./FriendCard.css";

function FriendCard({ friend }) {
    const netAmountClass = (friend.netAmount > 0)
        ? "net-amount positive"
        : "net-amount negative";
    const owesText = (friend.netAmount > 0)
        ? "owes you "
        : "you owe ";
    const netAmountText = (friend.netAmount > 0)
        ? centsToUSD(friend.netAmount)
        : centsToUSD(friend.netAmount * -1);

    return (
    <li className="friend-card">
        <div className="friend-info">
            <img src={friend.profileImage} className="friend-profile-image" />
            <div className="friend-info-text">
                <h3 className="friend-name">{friend.name}</h3>
                <p className={netAmountClass}>
                    {owesText}
                    <span>{netAmountText}</span>
                </p>
            </div>
        </div>
    </li>
    )
}

export default FriendCard;
