import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
// import { useNavigate } from "react-router-dom";

import LoggedInNavigation from "../components/Navigation/LoggedInNavigation";
import LandingNavigation from "../components/Navigation/LandingNavigation";
import loadState from "../utils/loadData";

export default function Layout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate())
      .then(() => loadState(dispatch))
      .then(() => setIsLoaded(true))
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
          <div id="header-contents">
            <p id="site-name">
              <span id="site-name-1">fair</span>
              <span id="site-name-2">share</span>
            </p>
            {isLoaded && user
              ? <LoggedInNavigation />
              : <LandingNavigation />
            }
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <Modal />
      </ModalProvider>
    </>
  );
}
