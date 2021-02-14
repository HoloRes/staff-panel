import axios from 'axios';
import {Box, Card, CardBody, Heading, Text} from 'grommet';
import {useState, useEffect} from 'react';
import {store} from 'react-notifications-component';

export default function UserInfo({userid}) {
	const [user, setUser] = useState();
	const [userLogsOne, setUserLogsOne] = useState();
	const [userLogsTwo, setUserLogsTwo] = useState();
	const [userNotesOne, setUserNotesOne] = useState();
	const [userNotesTwo, setUserNotesTwo] = useState();

	useEffect(() => {
		async function run() {
			const {data: user} = await axios.get(`/api/userinfo/${userid}`)
				.catch((e) => {
					const res = e.response;
					store.addNotification({
						title: 'Error',
						message: res && res.data && res.data.info || 'Something went wrong during fetching that user.',
						type: 'danger',
						insert: 'top',
						container: 'top-right',
						animationIn: ['animate__animated', 'animate__fadeIn'],
						animationOut: ['animate__animated', 'animate__fadeOut'],
						dismiss: {
							duration: 5000,
							onScreen: true
						}
					});
					console.error(e);
				});

			const {data: modLogs} = await axios.get(`/api/modlogs/?userid=${userid}&count=50`)
				.catch((e) => {
					const res = e.response;
					store.addNotification({
						title: 'Error',
						message: res && res.data && res.data.info || 'Something went wrong during fetching that user.',
						type: 'danger',
						insert: 'top',
						container: 'top-right',
						animationIn: ['animate__animated', 'animate__fadeIn'],
						animationOut: ['animate__animated', 'animate__fadeOut'],
						dismiss: {
							duration: 5000,
							onScreen: true
						}
					});
					console.error(e);
				});

			setUser(user);

			const notes = user.userData.notes;

			const userNotesOne = notes.slice(0, Math.ceil(notes.length / 2));
			const userNotesTwo = notes.slice(Math.ceil(notes.length / 2));

			const userNotesOneHtml = userNotesOne.map((note) => (
				<Card height={{min: "medium", max: "large"}} width="medium" pad="small">
					<Heading level='5' textAlign='center'>
						Note #{note._id}
						<hr style={{color: '#707070', opacity: '25%'}}/>
					</Heading>
					<CardBody>
						{note.value}
					</CardBody>
				</Card>
			));
			setUserNotesOne(userNotesOneHtml);
			const userNotesTwoHtml = userNotesTwo.map((note) => (
				<Card height={{min: "medium", max: "large"}} width="medium" pad="small">
					<Heading level='5' textAlign='center'>
						Note #{note._id}
						<hr style={{color: '#707070', opacity: '25%'}}/>
					</Heading>
					<CardBody>
						{note.value}
					</CardBody>
				</Card>
			));
			setUserNotesTwo(userNotesTwoHtml);

			const logs = modLogs.logs;

			const logsOne = logs.slice(0, Math.ceil(logs.length / 2));
			const logsTwo = logs.slice(Math.ceil(logs.length / 2));

			const userLogsOneHtml = logsOne.map((log) => (
				<Card height={{min: "medium", max: "large"}} width="medium" pad="small">
					<Heading level='5' textAlign='center'>
						#{log._id} | {log.type}{(log.duration ? (" | " + log.duration) : "")}
						<hr style={{color: '#707070', opacity: '25%'}}/>
					</Heading>
					<CardBody>
						{log.reason}
					</CardBody>
					<Heading level='5' textAlign='center'>
						<hr style={{color: '#707070', opacity: '25%'}}/>
						Issued by: {log.moderator}
					</Heading>
				</Card>
			));
			setUserLogsOne(userLogsOneHtml);
			const userLogsTwoHtml = logsTwo.map((log) => (
				<Card height={{min: "medium", max: "large"}} width="medium" pad="small">
					<Heading level='5' textAlign='center'>
						#{log._id} | {log.type}{(log.duration ? (" | " + log.duration) : "")}
						<hr style={{color: '#707070', opacity: '25%'}}/>
					</Heading>
					<CardBody>
						{log.reason}
					</CardBody>
					<Heading level='5' textAlign='center'>
						<hr style={{color: '#707070', opacity: '25%'}}/>
						Issued by: {log.moderator}
					</Heading>
				</Card>
			));
			setUserLogsTwo(userLogsTwoHtml);
		}

		run();
	}, []);

	if (!userLogsOne || !userLogsTwo || !userNotesOne || !userNotesTwo) return (
		<Box align="center" fill="horizontal" height="xxsmall">
			<Text>Loading...</Text>
		</Box>
	)

	return (
		<>
			<Box align="center" fill="horizontal" height="xxsmall">
				<Heading level='4' textAlign='center'>
					{user.userData.lastKnownTag}
					<br/>
					Active strikes: {user.activeStrikes} | Total strikes: {user.strikes}
				</Heading>
			</Box>
			<Box fill={true} direction="row">
				<Box fill="horizontal" align="center">
					<Heading level='4' textAlign='center'>
						Modlog
						<hr style={{color: '#707070', opacity: '25%'}}/>
					</Heading>
					<div style={{overflowY: "auto"}}>
						<Box overflow={true} direction="row">
							<Box margin="small">
								{userLogsOne}
							</Box>
							<Box>
								{userLogsTwo}
							</Box>
						</Box>
					</div>
				</Box>
				<hr/>
				<Box fill="horizontal" align="center" overflow="auto">
					<Heading level='4' textAlign='center'>
						Notes
						<hr style={{color: '#707070', opacity: '25%'}}/>
					</Heading>
					<div style={{overflowY: "auto"}}>
						<Box overflow={true} direction="row">
							<Box margin="small">
								{userNotesOne}
							</Box>
							<Box>
								{userNotesTwo}
							</Box>
						</Box>
					</div>
				</Box>
			</Box>
		</>
	)
}
