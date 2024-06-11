import SecondaryNavigation from "../SecondaryNavigation";
import FriendsList from "../FriendsList";
import DevLinksList from "../DevLinksList";
import './DashboardPage.css';
import FriendsSummary from "./FriendsSummary";


function DashboardPage() {

  return (
    <div className="columns-wrapper">
      <section className="left-column">
        <FriendsList />
      </section>
      <section className="middle-column">
        <SecondaryNavigation pageTitle="Dashboard" />
        <main>
          <FriendsSummary />
        </main>
      </section>
      <section className="right-column">
        <DevLinksList />
      </section>
    </div>
  )
}
1718126892000

export default DashboardPage;
