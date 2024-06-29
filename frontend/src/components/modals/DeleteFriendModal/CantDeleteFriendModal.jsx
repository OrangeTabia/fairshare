import { useNavigate } from "react-router-dom";

import { useModal } from "../../../context/Modal";
import "./DeleteFriendModal.css";

function CantDeleteFriendModal({friend}) {
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const doNotDelete = () => {
    closeModal();
    navigate(`/friend/${friend.id}`);
  };

  return (
    <div className="cannot-delete-friend">
      <h2>Cannot Remove Friend</h2>
      <p>You currently have open expenses with {friend.name}.</p>
      <p>Please settle your expenses before removing them as a friend.</p>
      <div className="delete-friend-buttons">
        <button className="form-cancel" onClick={doNotDelete}>Return</button>
      </div>
    </div>
  )
}

export default CantDeleteFriendModal;
