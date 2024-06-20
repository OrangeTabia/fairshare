import { useEffect, useState } from "react";
import SecondaryNavigation from "../SecondaryNavigation";
import FriendsList from "../FriendsList";
import DevLinksList from "../DevLinksList";
import ExpensesList from "../ExpensesList";


function ExpensesPage() {
  const [devInvisible, setDevInvisible] = useState(window.innerWidth < 1000);
  const [friendInvisible, setFriendInvisible] = useState(window.innerWidth < 800);

    // used to track the size of the page and remove sections based on the size
    useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 1000px)');

      const removeDevSection = (e) => {
        setDevInvisible(!e.matches)
      }
      removeDevSection(mediaQuery);

      mediaQuery.addEventListener('change', removeDevSection);
      return () => {
        mediaQuery.removeEventListener('change', removeDevSection)
      }

    }, [])

    useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 800px)');

      const removeFriendSection = (e) => {
        setFriendInvisible(!e.matches)
      }
      removeFriendSection(mediaQuery);

      mediaQuery.addEventListener('change', removeFriendSection);
      return () => {
        mediaQuery.removeEventListener('change', removeFriendSection)
      }

    }, [])

    return (
        <div className="columns-wrapper">
          <section className="left-column" >
            <FriendsList />
          </section>
          <section className="middle-column">
            <SecondaryNavigation pageTitle="All Expenses" />
            <main >
              <ExpensesList />
            </main>
          </section>
          {/* if page size is less than 1000px, do not display this section */}
          <section className="right-column" style={{ display: !devInvisible ? 'block' : 'none' }}>
            <DevLinksList />
          </section>
        </div>
    )
}

export default ExpensesPage;
