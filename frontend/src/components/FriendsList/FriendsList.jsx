import OpenModalButton from "../modals/OpenModalButton/OpenModalButton";
import AddFriendModal from "../modals/AddFriendModal/AddFriendModal";
import DeleteFriendModal from "../modals/DeleteFriendModal/DeleteFriendModal";
import CantDeleteFriendModal from "../modals/DeleteFriendModal/CantDeleteFriendModal";


import { useSelector } from "react-redux";
import './FriendsList.css'

import { HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



function FriendsList({currFriend}) {
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const friends = useSelector(state => state.friends)
    const expenses = useSelector(state => state.friendsExpenses)
    const [orderedFriends, setOrderedFriends] = useState([])

    useEffect(() => {
        const sortedFriends = Object.values(friends).sort((friend1, friend2) => friend1.name > friend2.name ? 1 : friend1.name < friend2.name ? -1 : 0)
        setOrderedFriends(sortedFriends)
    }, [friends])

    const checkForExpenses = (friend) => {
        console.log(friend)
        console.log(expenses)
        if (expenses) {
            Object.values(expenses).forEach(expense => {
                console.log(expense.payerId === friend.id, expense.receiverId === user.id)
                if (expense.receiverId === friend.id && expense.payerId === user.id) {
                    return 'expenses'
                }
                if (expense.payerId === friend.id && expense.receiverId === user.id) {
                    return 'expenses'
                }

            })
        }
        // return 'no expenses'
    }

    return (
        <div className="fiends-list-container">
            <h4 id="friends-list-title">FRIENDS</h4>
            <div className="friends-list">
                {orderedFriends.map(friend => (
                    <div key={friend.id} className={currFriend && currFriend?.name === friend?.name ? 'on-friends-page':'friends-list-ele'}>
                        <span
                            onClick={() => navigate(`/friend/${friend.id}`)}
                                >{friend.name}
                        </span>
                        {/* Set the modal component to 'unable to delete' component if there are open  */}
                        <OpenModalButton
                        buttonText={<HiOutlineX />}
                        modalComponent={Object.values(expenses).find(expense => (
                            expense.receiverId === friend.id || expense.payerId === friend.id
                            ))
                            ? <CantDeleteFriendModal friend={friend} />
                            : <DeleteFriendModal friend={friend} />}
                        id="delete-friend-modal-button"
                        />
                    </div>
                ))}
            </div>
        <div className="invite-friend-btn-container">
            <OpenModalButton
            buttonText='INVITE A FRIEND'
            modalComponent={<AddFriendModal />}
            id="add-friend-modal-button"
            />
        </div>

        </div>

    )
}

export default FriendsList;
