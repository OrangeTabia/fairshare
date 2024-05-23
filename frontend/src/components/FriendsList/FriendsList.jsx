import OpenModalButton from "../modals/OpenModalButton/OpenModalButton";
import AddFriendModal from "../modals/AddFriendModal/AddFriendModal";
import DeleteFriendModal from "../modals/DeleteFriendModal/DeleteFriendModal";

import { useSelector } from "react-redux";
import './FriendsList.css'

import { HiOutlineX } from "react-icons/hi";



function FriendsList() {
    const friends = useSelector(state => state.friends)


    // const handleDelete = (friend) => {
    //     alert
    // }

    return (
        <div className="fiends-list-container">

            <h4 id="friends-list-title">FRIENDS</h4>
            <div className="friends-list">
                {Object.values(friends).map(friend => (
                    <div key={friend.id} className="friends-list-ele">
                        <li >{friend.name}</li>
                        <OpenModalButton
                        buttonText={<HiOutlineX />}
                        modalComponent={<DeleteFriendModal friend={friend} />}
                        id="delete-friend-modal-button"
                        className="delete-friend-modal-button"
                        />
                    </div>
                ))}
            </div>
            <OpenModalButton
            buttonText='INVITE A FRIEND'
            modalComponent={<AddFriendModal />}
            id="delete-friend-modal-button"
            className="delete-friend-modal-button"
            />
        </div>

    )
}

export default FriendsList;
