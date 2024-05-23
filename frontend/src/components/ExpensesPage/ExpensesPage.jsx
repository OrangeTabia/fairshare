import SecondaryNavigation from "../SecondaryNavigation";
import FriendsList from "../FriendsList";
import DevLinksList from "../DevLinksList";
import ExpensesList from "../ExpensesList";
import { useSelector } from "react-redux";

function ExpensesPage() {
  const expenses = useSelector(state => state.friendsExpenses);

  return (
    <div className="columns-wrapper">
      <section className="left-column">
        <FriendsList />
      </section>
      <section className="middle-column">
        <SecondaryNavigation pageTitle="All Expenses" />
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

export default ExpensesPage;
