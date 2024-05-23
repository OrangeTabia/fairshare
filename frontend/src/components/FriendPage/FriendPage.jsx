import { useParams } from "react-router-dom";
import SecondaryNavigation from "../SecondaryNavigation";
import FriendsList from "../FriendsList";
import DevLinksList from "../DevLinksList";
import { useSelector } from "react-redux";
import ExpensesList from "../ExpensesList";
import './FriendPage.css'

function FriendPage() {
    const { friendId } = useParams();
    const currFriend = useSelector(state => state = state.friends[friendId])

    return (
        <div className="columns-wrapper">
          <section className="left-column">
            <FriendsList currFriend={currFriend}/>
          </section>
          <section className="middle-column">
            <SecondaryNavigation profileImage={currFriend?.profileImage} pageTitle={currFriend?.name} />
            <main>
                <ExpensesList />
            </main>
          </section>
          <section className="right-column">
            <DevLinksList />
          </section>
        </div>
      )
    }

export default FriendPage;
