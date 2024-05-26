import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdateComment } from "../../redux/friends_expenses";
import { useModal } from "../../context/Modal";
import "./Comments.css";

function EditComment({ comments }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState(comments.comment);
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

    await dispatch(thunkUpdateComment(updatedComment));

    closeModal();
  };

  return (
    <div>
      <h3>Edit Comment</h3>
      <form 
      onSubmit={handleSubmit} 
      id="edit-comments-form"
      >
        <textarea
          id="comment-text-area"
          cols="35"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {errors.comment && hasSubmitted && (
          <span className="form-error">{errors.comment}</span>
        )}
        <br></br>
        <div className="submit-cancel-btns">
          <button className="form-submit">Save</button>
          <button className="form-cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditComment;
