import { useParams } from "react-router-dom";
import SecondaryNavigation from "../SecondaryNavigation";
import FriendsList from "../FriendsList";
import DevLinksList from "../DevLinksList";
import { useSelector } from "react-redux";
import ExpensesList from "../ExpensesList";
import './FriendPage.css'
import { useEffect, useState } from "react";

function FriendPage() {
    const { friendId } = useParams();
    const currFriend = useSelector(state => state = state.friends[friendId])
    const allExpenses = useSelector(state => state.friendsExpenses)
    const currUser = useSelector(state => state.session.user)
    const [expenses, setExpenses] = useState([])


    useEffect(() => {
      const friendReceiver = Object.values(allExpenses).filter(expense => expense.payerId === currUser.id && expense.receiverId === parseInt(friendId))
      const friendPayer = Object.values(allExpenses).filter(expense => expense.payerId === parseInt(friendId) && expense.receiverId === currUser.id)
      const friendExpenses = [...friendReceiver, ...friendPayer]

      setExpenses(friendExpenses)

    }, [allExpenses, currFriend])


    return (
        <div className="columns-wrapper">
          <section className="left-column">
            <FriendsList currFriend={currFriend}/>
          </section>
          <section className="middle-column">
            <SecondaryNavigation profileImage={currFriend?.profileImage} pageTitle={currFriend?.name} />
            <main>
                <ExpensesList expenses={expenses} />
            </main>
          </section>
          <section className="right-column">
            <DevLinksList />
          </section>
        </div>
      )
    }

export default FriendPage;
