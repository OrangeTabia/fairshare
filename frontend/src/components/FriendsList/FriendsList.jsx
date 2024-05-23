import { useSelector } from "react-redux";
import './friendsList.css'


function FriendsList() {
    const friends = useSelector(state => state.friends)

    return (
        <div className="fiends-list-container">
            <h3>FRIENDS</h3>
            <div className="friends-list">
                {Object.values(friends).map(friend => (
                    <div key={friend.id} className="friends-list-ele">
                        <li >{friend.name}</li>
                        <div>X</div>
                    </div>
                ))}
            </div>
            <button>INVITE A FRIEND</button>
        </div>

    )
}

export default FriendsList;
