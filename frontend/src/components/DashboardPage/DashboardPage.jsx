import SecondaryNavigation from "../SecondaryNavigation";
import FriendsList from "../FriendsList";
import DevLinksList from "../DevLinksList";
import './DashboardPage.css';
import FriendsSummary from "./FriendsSummary";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import WalkthroughModal from "../modals/WalkthroughModal/WalkthroughModal";
import { thunkUpdateWalkthrough } from "../../redux/session";



function DashboardPage() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user);
  const [devInvisible, setDevInvisible] = useState(window.innerWidth < 1000);
  const [friendInvisible, setFriendInvisible] = useState(window.innerWidth < 800);
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
    {/* if page size is less than 800px, do not display this section */}
      <section className="left-column" style={{ display: !friendInvisible ? 'block' : 'none'}}>
        <FriendsList />
      </section>
      <section className="middle-column">
        <SecondaryNavigation pageTitle="Dashboard" />
        <main>
          <FriendsSummary />
        </main>
      </section>
      {/* if page size is less than 1000px, do not display this section */}
      <section className="right-column" style={{ display: !devInvisible ? 'block' : 'none' }}>
        <DevLinksList />
      </section>
    </div>
  )
}
// 1718126892000

export default DashboardPage;
