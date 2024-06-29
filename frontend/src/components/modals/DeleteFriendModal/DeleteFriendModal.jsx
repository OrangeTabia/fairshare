import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useModal } from "../../../context/Modal";
import { thunkDeleteFriend } from "../../../redux/friends";
import "./DeleteFriendModal.css";

function DeleteFriendModal({ friend }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const friendId = friend.id;

  const doNotDelete = () => {
    closeModal();
    navigate(`/friend/${friend.id}`)
  };

  const deleteFriend = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteFriend(friendId));
    closeModal();
    navigate("/");
  };

    return (
      <div className="delete-friend">
        <h2>Remove Friend</h2>
        <p>Are you sure you want to remove {friend.name} as a friend?</p>
        <div className="form-buttons-container">
          <button className="form-submit" onClick={deleteFriend}>Yes</button>
          <button className="form-cancel" onClick={doNotDelete}>No</button>
        </div>
      </div>
    )
  }

  export default DeleteFriendModal;
