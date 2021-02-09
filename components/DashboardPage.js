import {Avatar, Box, Clock, Header, Menu} from 'grommet';
import {useState, useEffect} from 'react';
import {signOut, useSession} from 'next-auth/client';
import {useRouter} from 'next/router';
import {tz} from 'moment-timezone';

import Navigation from './Navigation';
import Dashboard from './Dashboard/Dashboard';

export default function DashboardPage({darkMode, setDarkMode}) {
    const [currentPage, setCurrentPage] = useState(<Dashboard/>);

    const [session] = useSession();
    const router = useRouter();

    function changeTheme(event) {
        event.preventDefault();
        if (process.browser) localStorage.setItem('darkMode', `${!darkMode}`);
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        if (process.browser) {
            const storageDarkMode = localStorage.getItem('darkMode');
            if (storageDarkMode) setDarkMode(JSON.parse(storageDarkMode));
        }
    }, []);

    return (
        <div style={{height: '100%'}}>
            <Header style={{float: 'right', height: '8vh'}}>
                <Menu icon={false} label={<Box direction='row' gap='small'>{session ? <Box>{session.user.name}<br/><Clock type='digital' time={tz('Asia/Tokyo').format()}/></Box> : ''} <Avatar
                    src={session ? session.user.image : ''}/></Box>}
                      items={[{label: 'Toggle theme', onClick: changeTheme}, {
                          label: 'Logout', onClick: () => {
                              signOut();
                              router.push('/')
                          }
                      }]}/>
            </Header>
            <Box fill='vertical' direction='row'>
                <Box>
                    <Navigation setCurrentPage={setCurrentPage}/>
                </Box>
                <Box pad={{vertical: 'xlarge', horizontal: 'small'}}>
                    {currentPage}
                </Box>
            </Box>
        </div>
    )
}
