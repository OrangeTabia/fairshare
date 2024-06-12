import SecondaryNavigation from "../SecondaryNavigation";
import FriendsList from "../FriendsList";
import DevLinksList from "../DevLinksList";
import './DashboardPage.css';
import FriendsSummary from "./FriendsSummary";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import WalkthroughModal from "../modals/WalkthroughModal/WalkthroughModal";
import { thunkUpdateWalkthrough } from "../../redux/session";



function DashboardPage() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user);
  const { setModalContent } = useModal();


  const handleResources = async () => {
    await dispatch(thunkUpdateWalkthrough(user.id))
    const modalComponent = <WalkthroughModal />
    setModalContent(modalComponent);

  }

  useEffect(() => {
    if (!user.seen_walkthrough) {
      handleResources()
    }
  }, [])

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
