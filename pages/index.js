import {useSession} from 'next-auth/client'
import {useRouter} from "next/router";
import LoginPage from "../components/LoginPage";

export default function Login() {
    const [session, loading] = useSession();
    const router = useRouter();

    if (loading) return null;
    if (!loading && !session) return <LoginPage/>;
    router.push("/dashboard");
}
