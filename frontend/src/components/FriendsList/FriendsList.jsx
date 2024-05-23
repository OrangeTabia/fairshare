import OpenModalButton from "../modals/OpenModalButton/OpenModalButton";
import AddFriendModal from "../modals/AddFriendModal/AddFriendModal";
import DeleteFriendModal from "../modals/DeleteFriendModal/DeleteFriendModal";

import { useSelector } from "react-redux";
import './FriendsList.css'

import { HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



function FriendsList() {
    const friends = useSelector(state => state.friends)
    const navigate = useNavigate()
    const [orderedFriends, setOrderedFriends] = useState([])

    useEffect(() => {
        const sortedFriends = Object.values(friends).sort((friend1, friend2) => friend1.name > friend2.name ? 1 : friend1.name < friend2.name ? -1 : 0)
        setOrderedFriends(sortedFriends)

    }, [friends])

    return (
        <div className="fiends-list-container">

            <h4 id="friends-list-title">FRIENDS</h4>
            <div className="friends-list">
                {orderedFriends.map(friend => (
                    <div key={friend.id} className="friends-list-ele">
                        <span className='animated-friend-underline' onClick={() => navigate(`/friend/${friend.id}`)}>{friend.name}</span>
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
