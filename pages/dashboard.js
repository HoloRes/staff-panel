import {useSession} from "next-auth/client";
import {useRouter} from "next/router";
import DashboardPage from "../components/DashboardPage";

export default function Dashboard() {
    const [session, loading] = useSession();
    const router = useRouter();

    if (loading) return null;
    if (!loading && !session) router.push("/");
    return <DashboardPage/>
}