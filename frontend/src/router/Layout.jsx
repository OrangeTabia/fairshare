import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import { useNavigate } from "react-router-dom"; 
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
        navigate("/", {replace: true})
    } else {
      navigate("/dashboard")
    }
}, [user, navigate])


  return (
    <>
      <ModalProvider>
        <header>
          <div id="header-contents">
            <p id="site-name"><span id="site-name-1">fair</span><span id="site-name-2">share</span></p>
            <Navigation />
          </div>
        </header>
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}
