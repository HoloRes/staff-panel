import {Card, Box, Heading, Grid, Button} from 'grommet';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDiscord} from '@fortawesome/free-brands-svg-icons'
import {signIn} from 'next-auth/client';

export default function LoginPage() {
    return (
        <Box
            style={{background: 'linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(0,71,255,1) 100%)'}}
            fill='vertical'
            height='600px'
            pad='medium'
        >
            <Box align='center' pad='large'>
                <Card height='large' width='xxlarge' background='light-1'>
                    <Grid
                        rows={['xxlarge']}
                        columns={['50%', '50%']}
                        gap='none'
                        areas={[
                            {name: 'image', start: [0, 0], end: [0, 0]},
                            {name: 'main', start: [1, 0], end: [1, 0]}
                        ]}
                    >
                        <Box gridArea='image' fill='vertical'
                             background='url(/img/background.png)'/>
                        <Box gridArea='main' height='100%' fill='vertical' style={{textAlign: 'center'}}
                             pad={{vertical: 'medium'}} align='center'>
                            <Heading size='30'>Hololive Resort Discord<br/>Staff dashboard</Heading>
                            <Box pad={{vertical: 'large'}} width='27vh' height='15vh'>
                                <Button color='#7289DA' fill={true} primary
                                        label={<div style={{color: '#FFFFFF'}}><FontAwesomeIcon
                                            icon={faDiscord}/> Login with Discord</div>
                                        }
                                        onClick={() => {
                                            signIn('discord')
                                        }}/>
                            </Box>
                        </Box>
                    </Grid>
                </Card>
            </Box>
        </Box>
    )
}
