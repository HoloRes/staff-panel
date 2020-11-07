import {useSession} from 'next-auth/client'
import {useRouter} from "next/router";

import LoginPage from "../components/LoginPage";
import DashboardPage from "../components/DashboardPage";

export default function SPA({darkMode, setDarkMode}) {
    const [session, loading] = useSession();
    const router = useRouter();

    if (loading) return null;
    if (!loading && !session) return <LoginPage/>;
    return <DashboardPage darkMode={darkMode} setDarkMode={setDarkMode}/>;
}
