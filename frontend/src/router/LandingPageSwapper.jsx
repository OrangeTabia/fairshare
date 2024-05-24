import { useSelector } from "react-redux";

import Layout from "./Layout";
import LandingPage from "../components/LandingPage/LandingPage";

function LandingPageSwapper() {
    const user = useSelector(state => state.session.user);
    // return (user) ? <Layout /> : <LandingPage />
    return (
        <Layout />
    )
}

export default LandingPageSwapper;
