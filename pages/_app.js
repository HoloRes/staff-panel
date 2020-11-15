import {Provider} from "next-auth/client";
import {Grommet} from "grommet";
import Head from "next/head";
import {useState} from "react";

const myTheme = {
    "name": "Hololive Resistance - Staff dashboard",
    "rounding": 4,
    "spacing": 24,
    "defaultMode": "dark",
    "global": {
        "colors": {
            "brand": {
                "dark": "#3377FF",
                "light": "#3377FF"
            },
            "background": {
                "dark": "#111111",
                "light": "#FFFFFF"
            },
            "background-back": {
                "dark": "#111111",
                "light": "#EEEEEE"
            },
            "background-front": {
                "dark": "#222222",
                "light": "#FFFFFF"
            },
            "background-contrast": {
                "dark": "#FFFFFF11",
                "light": "#11111111"
            },
            "text": {
                "dark": "#EEEEEE",
                "light": "#333333"
            },
            "text-strong": {
                "dark": "#FFFFFF",
                "light": "#000000"
            },
            "text-weak": {
                "dark": "#CCCCCC",
                "light": "#444444"
            },
            "text-xweak": {
                "dark": "#999999",
                "light": "#666666"
            },
            "border": {
                "dark": "#444444",
                "light": "#CCCCCC"
            },
            "control": {
                "light": "brand",
                "dark": "brand"
            },
            "active-background": "background-contrast",
            "active-text": "text-strong",
            "selected-background": "brand",
            "selected-text": "text-strong",
            "status-critical": "#FF4040",
            "status-warning": "#FFAA15",
            "status-ok": "#00C781",
            "status-unknown": "#CCCCCC",
            "status-disabled": "#CCCCCC",
            "graph-0": "brand",
            "graph-1": "status-warning",
            "focus": {
                "light": "#33ccfd",
                "dark": "#33ccfd"
            }
        },
        "font": {
            "family": "'Noto Sans', sans-serif"
        },
        "active": {
            "background": "active-background",
            "color": "active-text"
        },
        "hover": {
            "background": "active-background",
            "color": "active-text"
        },
        "selected": {
            "background": "selected-background",
            "color": "selected-text"
        }
    },
    "chart": {},
    "diagram": {
        "line": {}
    },
    "meter": {},
    "layer": {
        "background": {
            "dark": "#111111",
            "light": "#FFFFFF"
        }
    },
    "tip": {
        "drop": {}
    }
}

export default function App({Component, pageProps}) {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <Provider session={pageProps.session}>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet" />
                <title>Hololive Resistance Discord - Staff dashboard</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <style>{`
                    * {
                        font-family: 'Noto Sans', sans-serif;
                    }
                `}</style>
            </Head>
            <Grommet full theme={myTheme} themeMode={darkMode ? "dark" : "light"}>
                <Component {...pageProps} darkMode={darkMode} setDarkMode={setDarkMode} />
            </Grommet>
        </Provider>
    )
}