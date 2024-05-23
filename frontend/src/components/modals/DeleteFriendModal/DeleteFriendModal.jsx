import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteFriend } from "../../../redux/friends";
import { useDispatch } from "react-redux";

function DeleteFriendModal({friend}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    let friendId = friend.id

    const doNotDelete = () => {
          closeModal();
          navigate(`/friend/${friend.id}`)
      };

    const deleteFriend = async (e) => {
        e.preventDefault();

        await dispatch(thunkDeleteFriend(friendId));

        closeModal();
        navigate("/");
    }

    return (
        <div>
            <p>Are you sure you want to remove {friend.name} as a friend?</p>
            <div>
                <button onClick={deleteFriend}>Yes</button>
                <button onClick={doNotDelete}>No</button>
            </div>
        </div>

    )
}

export default DeleteFriendModal;
