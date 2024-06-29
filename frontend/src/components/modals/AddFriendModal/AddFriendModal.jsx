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
    setFriendSelected(friend);
  };

  const handleAddFriend = async (e) => {
    e.preventDefault();
    dispatch(thunkAddFriend(friendSelected.email));
    setFriendSelected('');
    setSuggestedFriends([]);
    setEmail('');
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

          <p className="select-friend-label">Select an email</p>
          <div className='form-item'>
            <ul className='email-select-list'>
              {suggestedFriends.length > 0 ? (
                suggestedFriends.map(friend => (
                  <li
                    className='email-select-item'
                    key={friend.id}
                    onClick={() => selectingUser(friend)}
                  >
                    {friend.email}
                  </li>
                ))) : (
                  <li className="no-results-item">No results found</li>
                )
              }
            </ul>
          </div>

          <div
            className={(friendSelected)
              ? 'form-item selected-friend-container'
              : 'no-display'
            }
          >
            <img
              className='user-profile-image'
              src={friendSelected.profileImage}
              hidden={!friendSelected}
            />
            <div hidden={!friendSelected}>
              Add {friendSelected.name} as a friend?
            </div>
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
