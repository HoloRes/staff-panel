import Head from "next/head";
import {Card,ThemeContext} from "grommet";

export default function LoginPage() {
    return (
        <div>
            <Head>
                <title>Hololive Resistance Discord - Staff panel</title>
                <style>{`
                    html {
                        background: rgb(0,212,255);
                        background: linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(0,71,255,1) 100%);
                    }
                    `}
                </style>
            </Head>
            <ThemeContext.Extend value={{global: {colors: {background: "transparent"}}}}>
                <Card height="medium" width="large" background="light-1">

                </Card>
            </ThemeContext.Extend>
        </div>
    )
}