import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkAddFriend } from "../../../redux/friends";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router-dom";
import './AddFriendModal.css'

function AddFriendModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    const [email, setEmail] = useState('')
    const [suggestedFriends, setSuggestedFriends] = useState([])
    const [friendSelected, setFriendSelected] = useState('')
    const currFriends = useSelector(state => state.friends)
    const allUsers = useSelector(state => state.userEmails)
    const currUser = useSelector(state => state.session.user)


    useEffect(() => {
        const removeIndex = Object.values(currFriends).map(friend => friend.name)
        const removeCurrFriends = Object.values(allUsers).filter(user => !removeIndex.includes(user.name))
        const removeSelf = Object.values(removeCurrFriends).filter(user => user.name !== currUser.name)

        const suggested = Object.values(removeSelf).filter(user => user.email.startsWith(email))
        if (email) {
            setSuggestedFriends(suggested.slice(0, 5))
            setFriendSelected('')
        } else {
            setSuggestedFriends([])
        }

    }, [email, allUsers, currFriends, currUser])

    const selectingUser = (friend) => {
        setFriendSelected(friend)
        setSuggestedFriends([])
        setEmail('')
    }

    const handleAddFriend = async (e) => {
        e.preventDefault();

        await dispatch(thunkAddFriend(friendSelected.email));

        closeModal();
        navigate(`friend/${friendSelected.id}`)
    }

    return (
        <div>
            <form onSubmit={handleAddFriend}>
                <div className="add-friend-input">
                    <label>Add a Friend</label>
                    <input
                        type='text'
                        value={email}
                        placeholder="Enter an email"
                        onChange={(e) => setEmail(e.target.value)}
                        >
                    </input>
                </div>
                {suggestedFriends.map(friend => (
                    <div key={friend.id}>
                        <div className='list-user-email-item' onClick={() => selectingUser(friend)} >{friend.email}</div>
                    </div>
                ))}
                <div className='chosen-user-container' hidden={!friendSelected}>
                    <img className='user-profile-image' src={friendSelected.profileImage} hidden={!friendSelected}/>
                    <div hidden={!friendSelected} >add {friendSelected.name} as a friend?</div>
                </div>
                <button type="submit">Add Friend</button>
            </form>
        </div>
    )
}

export default AddFriendModal;
