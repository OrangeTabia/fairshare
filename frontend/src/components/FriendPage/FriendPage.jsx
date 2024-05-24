import { useParams } from "react-router-dom";
import SecondaryNavigationFriends from "../SecondaryNavigation/SecondaryNavigationFriends";
import FriendsList from "../FriendsList";
import DevLinksList from "../DevLinksList";
import { useSelector } from "react-redux";
import FriendsExpensesList from "../FriendsExpensesList";
import './FriendPage.css'
import { useEffect, useState } from "react";

function FriendPage() {
    const { friendId } = useParams();
    const currFriend = useSelector(state => state = state.friends[friendId])

    return (
        <div className="columns-wrapper">
          <section className="left-column">
            <FriendsList currFriend={currFriend}/>
          </section>
          <section className="middle-column">
            <SecondaryNavigationFriends profileImage={currFriend?.profileImage} pageTitle={currFriend?.name} />
            <main>
                <FriendsExpensesList />
            </main>
          </section>
          <section className="right-column">
            <DevLinksList />
          </section>
        </div>
      )
    }

export default FriendPage;
