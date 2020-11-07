import {useSession} from 'next-auth/client'
import {useRouter} from "next/router";
import LoginPage from "../components/LoginPage";
import {useEffect} from "react";

export default function Login() {
    const [session, loading] = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session) setTimeout(() => {router.push("/dashboard");}, 500);
    }, [session]);

    if (loading) return null;
    if (!loading && !session) return <LoginPage/>;
    return "Loading..."
}
