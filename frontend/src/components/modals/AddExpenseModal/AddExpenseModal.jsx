import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal"; 
import { thunkAddFriendsExpense } from "../../../redux/friends_expenses";


function AddExpenseModal() {
    const dispatch = useDispatch(); 
    const [payer, setPayer] = useState(null); // payer owes current user money
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [expenseDate, setExpenseDate] = useState("");
    const [notes, setNotes] = useState(""); 
    const [validations, setValidations] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false); 
    const [suggestedFriends, setSuggestedFriends] = useState([])
    const [friendSelected, setFriendSelected] = useState("")
    const currentUser = useSelector(state => state.session.user);
    const currentFriends = useSelector(state => state.friends);
    const allUsers = useSelector(state => state.userEmails);
    const friendsList = useSelector(state => state.friends); 
    const { closeModal } = useModal();

    useEffect(() => {
        const frontValidations = {};
        if (payer === null) frontValidations.payer = "Payer is required";
        if (!description) frontValidations.description = "A brief description of the expense is required";
        if (description.length > 200) frontValidations.description = "Description must be less than 200 characters";
        if (!amount || amount <= 0) frontValidations.amount = "Expense must have a minimum of $0.01"; 
        if (!expenseDate) frontValidations.expenseDate = "Please enter a date for the expense"; 
        if (notes.length > 200) frontValidations.notes = "Note must be less than 200 characters";
        setValidations(frontValidations); 
    }, [payer, description, amount, expenseDate, notes]); 


    useEffect(() => {
        const removeIndex = Object.values(currentFriends).map(friend => friend.name);
        const removeCurrentFriends = Object.values(allUsers).filter(user => !removeIndex.includes(user.name));
        const removeSelf = Object.values(removeCurrentFriends).filter(user => user.name !== currentUser.name);
        const suggested = Object.values(removeSelf).filter(user => user.name.startsWith(name)); 
        if (name) {
            setSuggestedFriends(suggested.slice(0, 5))
            setFriendSelected('')
        } else {
            setSuggestedFriends([])
        }
    }, [name])

    const selectingUser = (friend) => {
        setFriendSelected(friend)
        setSuggestedFriends([])
        setName('')
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newDate = new Date(expenseDate);
        setHasSubmitted(true); 

        const newExpense = {
            payerId: payer,
            receiverId: currentUser.id,
            description,
            amount,
            expenseDate: newDate,
            settled: false,
            notes
        }
        const addExpense = await dispatch(thunkAddFriendsExpense(newExpense)); 
        addExpense;
        // if (!addExpense.id) {
        //     const { errors } = await addExpense.json(); 
        //     setValidations(errors); 
        // }
        closeModal(); 
    }


    return (
        <>
            <h2>Add an expense</h2>
            <form
                onSubmit={handleSubmit}
                id="add-expense-form"
            >
                <div>
                    {/* <div className="form-label">
                        {suggestedFriends.map(friend => (
                            <div key={friend.id}>
                                <div className='list-user-email-item' onClick={() => selectingUser(friend)} >{friend.email}</div>
                            </div>
                        ))}
                        <div
                            type='text'
                            value={payer}
                            placeholder="Enter a payer name"
                            onChange={(e) => setPayer(e.target.value)}
                            >
                                <div className='chosen-user-container' hidden={!friendSelected}></div>
                        </div>
                        {validations.payer && hasSubmitted && (
                        <span className="form-error">{validations.payer}</span>
                        )}
                    </div> */}
                    <div className="form-label">
                        {/* <selelct 
                        id="friends"
                        >
                        {friendsList.map((friend) => (
                            <option key={friend.id}>{friend.name}</option>
                        ))}
                         </selelct> */}
                        <input
                            id="description"
                            type="text"
                            value={description}
                            placeholder="Enter a description"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        {validations.description && hasSubmitted && (
                        <span className="form-error">{validations.description}</span>
                        )}
                    </div>
                    <div className="form-label">
                        <input
                            id="amount"
                            type="text"
                            value={amount}
                            placeholder="0.00"
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        {validations.amount && hasSubmitted && (
                        <span className="form-error">{validations.amount}</span>
                        )}
                    </div>
                    <div className="form-label">
                        <input
                            id="expense_date"
                            type="date"
                            value={expenseDate}
                            onChange={(e) => setExpenseDate(e.target.value)}
                            required
                        />
                        {validations.expenseDate && hasSubmitted && (
                        <span className="form-error">{validations.expenseDate}</span>
                        )}
                    </div>
                    <div className="form-label">
                        <input
                            id="notes"
                            type="text"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        {validations.notes && hasSubmitted && (
                        <span className="form-error">{validations.notes}</span>
                        )}
                    </div>

                    <div>
                        <button 
                        className="form-cancel"
                        onClick={closeModal}
                        >Cancel</button>
                        <button className="form-submit">Save</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddExpenseModal;
