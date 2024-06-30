import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import Layout from "./Layout";
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import LandingPage from "../components/LandingPage/LandingPage";
import { thunkAuthenticate } from "../redux/session";

function LandingPageSwapper() {
    const user = useSelector(state => state.session.user);
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch((thunkAuthenticate()))
        .then(() => setLoading(false))
    }, [dispatch]);

    if (loading) return <LoadingScreen />

    return (user) ? <Layout /> : <LandingPage />
}

export default LandingPageSwapper;
