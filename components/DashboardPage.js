import {Box} from "grommet";
import Navigation from "./Navigation";

export default function DashboardPage({darkMode, setDarkMode}) {
    return (
        <Box fill="vertical">
            <Navigation darkMode={darkMode} setDarkMode={setDarkMode}/>
        </Box>
    )
}