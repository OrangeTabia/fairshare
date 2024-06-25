import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { thunkAddFriend } from "../../../redux/friends";
import { useModal } from "../../../context/Modal";
import './AddFriendModal.css'

function AddFriendModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const currFriends = useSelector(state => state.friends);
  const allUsers = useSelector(state => state.userEmails);
  const currUser = useSelector(state => state.session.user);

  const [email, setEmail] = useState('');
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [friendSelected, setFriendSelected] = useState('');
  // const [submitClass, setSubmitClass] = useState("form-submit");

  useEffect(() => {
    const removeIndex = Object.values(currFriends)
      .map(friend => friend.name);

    const removeCurrFriends = Object.values(allUsers)
      .filter(user => !removeIndex.includes(user.name));

    const removeSelf = Object.values(removeCurrFriends)
      .filter(user => user.name !== currUser.name);

    const suggested = Object.values(removeSelf)
      .filter(user => user.email.startsWith(email));

    setSuggestedFriends((email) ? suggested.slice(0, 5) : []);
  }, [email, allUsers, currFriends, currUser]);

  const selectingUser = (friend) => {
    setFriendSelected(friend)
    setSuggestedFriends([])
    setEmail('')
  };

  const handleAddFriend = async (e) => {
    e.preventDefault();
    await dispatch(thunkAddFriend(friendSelected.email));
    setFriendSelected('');
    closeModal();
    navigate(`friend/${friendSelected.id}`);
  };

  return (
    <>
      <h2>Add a Friend</h2>
      <form id="add-friend-form" onSubmit={handleAddFriend}>
        <div className="form-content-container">
          <div className="form-label">
            <label>Search for a Friend</label>
          </div>
          <div className="form-item">
            <input
              type='text'
              value={email}
              placeholder="Enter an email"
              onChange={(e) => setEmail(e.target.value)}
              >
            </input>
          </div>

          <div className='select-a-friend'>
            <p className="select-friend-small-label">click email to select</p>
            {suggestedFriends.map(friend => (
              <div key={friend.id}>
                <div className='list-user-email-item' onClick={() => selectingUser(friend)} >{friend.email}</div>
              </div>
            ))}
          </div>

          <div className='chosen-user-container' hidden={!friendSelected}>
            <img className='user-profile-image' src={friendSelected.profileImage} hidden={!friendSelected}/>
            <div hidden={!friendSelected} >add {friendSelected.name} as a friend?</div>
          </div>

          <button
            className="form-submit"
            disabled={!friendSelected}
            type="submit"
          >
            Add Friend
          </button>
        </div>
      </form>
    </>
  )
}

export default AddFriendModal;
