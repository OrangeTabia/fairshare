import OpenModalButton from "../modals/OpenModalButton/OpenModalButton";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddComment } from "../../redux/friends_expenses";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment"; 
import "./Comments.css";
import { HiOutlineX } from "react-icons/hi";
import { PiNotePencilBold } from "react-icons/pi";

function AddComment({comments, expense}) {
    const dispatch = useDispatch(); 
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState(""); 
    const [hasSubmitted, setHasSubmitted] = useState(""); 
    const currentUser = useSelector(state => state.session.user);


    useEffect(() => {
        const errors = {};
        if (comment.length > 200) errors.comment = "Comment must be less than 200 characters";
        setErrors(errors);
    }, [comment]);

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        setHasSubmitted(true); 
        
        const newComment = {
            userId: currentUser.id,
            friendsExpenseId: expense.id,
            comment
        }

        await dispatch(thunkAddComment(newComment)); 
    }


    return (
        <>
            <h5>NOTES AND COMMENTS</h5>
            <div id="existing-note">
                <label id="note-label">Notes</label>
                <div>
                    {expense?.notes}
                </div>
            </div>
            <div id="existing-and-new-comments">
                <div id="existing-comments">
                    {comments.map((comment) => (
                        <div key={comment.id}>
                        {comment.comment} - {comment.createdAt}
                        <span>
                        <OpenModalButton
                            id="delete-expense-modal-button"
                            buttonText={<HiOutlineX />}
                            modalComponent={<DeleteComment comments={comments} />}
                        />

                        <OpenModalButton
                            id="edit-expense-modal-button"
                            className="modal-button"
                            buttonText={<PiNotePencilBold />}
                            modalComponent={<EditComment comments={comments} expense={expense} />}
                        />
                        </span>
                        </div>
                    ))}
                </div>
                <div className="new-comment">
                    
                </div>
                <div className="form-label">
                    <form 
                    onSubmit={handleSubmit}
                    id="add-comment-form"
                    >
                        <textarea
                            id="comment"
                            type="text"
                            placeholder="Add a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        {errors.comment && hasSubmitted && (
                        <span className="form-error">{errors.comment}</span>
                        )}
                        <br></br>
                        <button className="form-submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddComment;