import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdateComment } from "../../redux/friends_expenses";
import { useModal } from "../../context/Modal";
import "./Comments.css";

function EditComment({ comments }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState("");
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = {};
    if (comment.length > 200)
      errors.comment = "Comment must be less than 200 characters";
    setErrors(errors);
  }, [comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    const updatedComment = {
      id: comments.id,
      userId: comments.userId,
      expenseId: comments.expenseId,
      comment,
    };

    console.log("----->", comments.userId, comments, comment);

    await dispatch(thunkUpdateComment(updatedComment));

    closeModal();
  };

  return (
    <>
      <h3>Edit Comment</h3>
      <form onSubmit={handleSubmit} id="edit-comments-form">
        <textarea
          id="comment"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {errors.comment && hasSubmitted && (
          <span className="form-error">{errors.comment}</span>
        )}
        <br></br>
        <button className="form-cancel" onClick={closeModal}>
          Cancel
        </button>
        <button className="form-submit">Save</button>
      </form>
    </>
  );
}

export default EditComment;