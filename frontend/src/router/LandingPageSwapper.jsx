import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Layout from "./Layout";
import LandingPage from "../components/LandingPage/LandingPage";
import { thunkAuthenticate } from "../redux/session";

function LandingPageSwapper() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch((thunkAuthenticate()))
    }, [dispatch]);

    return (user) ? <Layout /> : <LandingPage />
}

export default LandingPageSwapper;
