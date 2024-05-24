import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { thunkDeleteComment } from "../../redux/friends_expenses";

function DeleteComment({ comments }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  console.log("COMMENT ID", comments.id);

  const deleteComment = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteComment(comments));
    closeModal();
  };

  return (
    <div>
      <p>Are you sure you want to remove this comment?</p>
      <div>
        <button onClick={deleteComment}>Yes</button>
        <button onClick={closeModal}>No</button>
      </div>
    </div>
  );
}

export default DeleteComment;
