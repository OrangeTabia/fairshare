import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import { thunkDeleteComment } from "../../redux/friends_expenses";

function DeleteComment({ comments }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const commentsArray = Object.values(comments);
  console.log("COMMENT ID", commentsArray)


  const deleteComment = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteComment(commentId));
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