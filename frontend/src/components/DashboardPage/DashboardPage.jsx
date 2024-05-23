import SecondaryNavigation from "../SecondaryNavigation";
import FriendsList from "../FriendsList";
import DevLinksList from "../DevLinksList";
import './DashboardPage.css';

function DashboardPage() {
  return (
    <div className="columns-wrapper">
      <section className="left-column">
        <FriendsList />
      </section>
      <section className="middle-column">
        <SecondaryNavigation pageTitle="Dashboard" />
        <main>

        </main>
      </section>
      <section className="right-column">
        <DevLinksList />
      </section>
    </div>
  )
}

export default DashboardPage;
