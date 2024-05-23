import { useSelector } from "react-redux";
import './friendsList.css'

import { HiOutlineX } from "react-icons/hi";



function FriendsList() {
    const friends = useSelector(state => state.friends)

    return (
        <div className="fiends-list-container">
            <h3>FRIENDS</h3>
            <div className="friends-list">
                {Object.values(friends).map(friend => (
                    <div key={friend.id} className="friends-list-ele">
                        <li >{friend.name}</li>
                        <div className="delete-friend-button" onClick={() => alert(`Are you sure you want to remove ${friend.name} as a friend?`)}><HiOutlineX /></div>
                    </div>
                ))}
            </div>
            <button className="invite-friend" onClick={() => alert('opens an invite a friend modal')}>INVITE A FRIEND</button>
        </div>

    )
}

export default FriendsList;
