import { useNavigate } from "react-router-dom";

import { useModal } from "../../../context/Modal";
import "./DeleteFriendModal.css";

function CantDeleteFriendModal({friend}) {
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const doNotDelete = () => {
    closeModal();
    navigate(`/friend/${friend.id}`)
  };

    return (
        <div className="cant-delete-friend">
            <p>You currently have open expenses with {friend.name}.</p>
            <p>Please settle your expenses before removing them as a friend.</p>
            <div className="delete-friend-buttons">
                <button className="form-cancel" onClick={doNotDelete}>Return</button>
            </div>
        </div>

    )
  }

  export default CantDeleteFriendModal;
