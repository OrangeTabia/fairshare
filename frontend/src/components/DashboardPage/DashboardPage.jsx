import SecondaryNavigation from "../SecondaryNavigation";
import FriendsList from "../FriendsList";
import DevLinksList from "../DevLinksList";

function DashboardPage() {
  return (
    <div className="columns-wrapper">
      <section className="left-column">
        <FriendsList />
      </section>
      <section className="middle-column">
        <SecondaryNavigation pageTitle="Dashboard" />
        <p>Lorem Ipsum</p>
      </section>
      <section className="right-column">
        <DevLinksList />
      </section>
    </div>
  )
}

export default DashboardPage;
