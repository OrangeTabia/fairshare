import { useParams } from "react-router-dom";
import SecondaryNavigationFriends from "../SecondaryNavigation/SecondaryNavigationFriends";
import FriendsList from "../FriendsList";
import DevLinksList from "../DevLinksList";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FriendsExpensesList from "../FriendsExpensesList";
import './FriendPage.css'

function FriendPage() {
    const { friendId } = useParams();
    const currFriend = useSelector(state => state = state.friends[friendId])
    const [devInvisible, setDevInvisible] = useState(window.innerWidth < 1001);

    // used to track the size of the page and remove sections based on the size
    useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 1001px)');

      const removeDevSection = (e) => {
        setDevInvisible(!e.matches)
      }
      removeDevSection(mediaQuery);

      mediaQuery.addEventListener('change', removeDevSection);
      return () => {
        mediaQuery.removeEventListener('change', removeDevSection)
      }

    }, [])

    return (
          <div>
              <div className="columns-wrapper">
              <section className="left-column" >
                  <FriendsList currFriend={currFriend}/>
                </section>
                <section className="middle-column">
                  <SecondaryNavigationFriends profileImage={currFriend?.profileImage} pageTitle={currFriend?.name} />
                  <main>
                      <FriendsExpensesList />
                  </main>
                </section>
                 {/* if page size is less than 1000px, do not display this section */}
                <section className="right-column" style={{ display: !devInvisible ? 'block' : 'none' }}>
                    <DevLinksList />
                </section>
              </div>

              <section className="right-column" style={{ display: devInvisible ? 'block' : 'none' }}>
                  <DevLinksList />
              </section>
          </div>
      )
    }

export default FriendPage;
