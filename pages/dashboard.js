import {useSession} from "next-auth/client";
import {useRouter} from "next/router";
import DashboardPage from "../components/DashboardPage";
import {useState, useEffect} from "react";

export default function Dashboard({darkMode, setDarkMode}) {
    const [session, loading] = useSession();
    const router = useRouter();
    const [reload, setReload] = useState(false);

    if (loading) return null;
    if (!loading && !session) router.push("/");
    return (
        <DashboardPage darkMode={darkMode} setDarkMode={setDarkMode}/>
    )
}