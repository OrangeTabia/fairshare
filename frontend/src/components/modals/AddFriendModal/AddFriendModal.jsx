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
    // const currFriends = useSelector(state => state.friends)
    const allUsers = useSelector(state => state.userEmails)

    useEffect(() => {
        // need to remove all current friends from this list
        // const filteredUsers = Object.values(Object.values(allUsers)).map(user => !Object.values(Object.values(currFriends)).includes(user))
        // console.log('filtered', filteredUsers)
        const suggested = Object.values(allUsers).filter(user => user.email.startsWith(email))
        if (email) {
            setSuggestedFriends(suggested.slice(0, 5))
            setFriendSelected('')
        } else {
            setSuggestedFriends([])
        }

    }, [email])

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
