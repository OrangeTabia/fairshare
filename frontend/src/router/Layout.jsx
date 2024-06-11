import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
// import { useNavigate } from "react-router-dom";

import LoggedInNavigation from "../components/Navigation/LoggedInNavigation";
import ProfileButton from "../components/Navigation/ProfileButton";
import loadState from "../utils/loadData";

export default function Layout() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.session.user);
  // const navigate = useNavigate();
  // const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate())
      .then(() => loadState(dispatch))
      // .then(() => setIsLoaded(true))
      .catch((error) => console.log(error));
  }, [dispatch]);

  // Fix conditional redirects later

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/", { replace: true });
  //   }
  // }, [user, navigate]);

  return (
    <>
      <ModalProvider>
        <header id="main-header">
          <div id="header-content">
            <div className="header-container hc-1">
              <p id="site-name">
                <span id="site-name-1">fair</span>
                <span id="site-name-2">share</span>
              </p>
            </div>
            <div className="header-container hc-2">
              <LoggedInNavigation />
            </div>
            <div className="header-container hc-3">
              <ProfileButton />
            </div>
          </div>
        </header>
        <main id="main-content">
          <Outlet />
        </main>
        <Modal />
      </ModalProvider>
    </>
  );
}
