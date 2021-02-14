import {Box, DataTable, Layer, Text} from 'grommet';
import {useEffect, useState} from 'react';
import {Tip} from 'grommet/components/Tip';
import axios from 'axios';
import {store} from 'react-notifications-component';
import UserInfo from "./UserInfo";

export default function StrikeList() {
	const [users, setUsers] = useState([]);
	const [userOpen, setUserOpen] = useState(false);
	const [userId, setUserId] = useState(null);
	const [offset, setOffset] = useState(0);
	const [total, setTotal] = useState(null);

	const fetchErrorNotification = {
		title: 'Error',
		message: 'Something went wrong during fetching mod logs.',
		type: 'danger',
		insert: 'top',
		container: 'top-right',
		animationIn: ['animate__animated', 'animate__fadeIn'],
		animationOut: ['animate__animated', 'animate__fadeOut'],
		dismiss: {
			duration: 5000,
			onScreen: true
		}
	}

	const dateOptions = {year: 'numeric', month: 'long', day: 'numeric'}

	useEffect(() => {
		async function run() {
			const res = await axios.get('/api/users', {
				params: {
					offset,
					count: 50
				}
			}).catch((e) => {
				store.addNotification(fetchErrorNotification);
				console.error(e);
			});

			setTotal(res.data.count);
			setOffset(offset + 50);
			setUsers(res.data.users)
		}

		run();
	}, []);

	async function onMore() {
		if (total - offset < 50) {
			if (total - offset > 0) {
				const res = await axios.get('/api/users', {
					params: {
						count: total - offset,
						offset
					}
				}).catch((e) => {
					store.addNotification(fetchErrorNotification);
					console.error(e);
				});

				setOffset(offset + 50);
				setUsers([
					...users,
					...res.data.users
				]);
			} else return;
		} else {
			const res = await axios.get('/api/users', {
				params: {
					count: total,
					offset
				}
			}).catch((e) => {
				store.addNotification(fetchErrorNotification);
				console.error(e);
			});

			setOffset(offset + 50);
			setUsers([
				...users,
				...res.data.users
			]);
		}
	}


	return (
		<>
			<Box pad={{horizontal: 'small'}} fill={true}>
				<div style={{overflowY: "auto"}}>
					<DataTable fill='horizontal' pad='small' data={users} replace={true} onMore={() => onMore()}
							   pin={true}
							   columns={[
								   {
									   property: 'username',
									   header: <Text>User</Text>,
									   render: datum => (
										   <div style={{cursor: 'pointer'}} onClick={() => {
											   setUserId(datum.userData._id);
											   setUserOpen(true);
										   }}>
											   <Tip dropProps={{align: {top: 'right'}}} content={
												   <Box pad='small' gap='small' width={{max: 'small'}} round='small'
														background='background-back' plain>
													   <Text>User ID: {datum.userData._id}</Text>
												   </Box>
											   }>
												   <Text>{datum.userData.lastKnownTag}</Text>
											   </Tip>
										   </div>
									   ),
									   primary: true
								   },
								   {
									   property: 'activeStrikes',
									   header: <Text>Active strikes</Text>,
									   render: datum => (
										   <Text>{datum.activeStrikes}</Text>
									   )
								   },
								   {
									   property: 'lastStrikeDate',
									   header: <Text>Last strike issued date</Text>,
									   render: datum => {
										   if (datum.lastStrikeDate) {
											   const date = new Date(datum.lastStrikeDate).toLocaleDateString('en-US', dateOptions).split(',')
											   date[0] = `${date[0]}th`
											   const newDateString = date.join(', ');
											   return <Text>{newDateString}</Text>;
										   } else return <Text>Never</Text>
									   }
								   },
								   {
									   property: 'strikeExpiration',
									   header: <Text>When next strike expires</Text>,
									   render: datum => {
										   if (datum.strikeExpiration) {
											   const date = new Date(datum.strikeExpiration).toLocaleDateString('en-US', dateOptions).split(',');
											   date[0] = `${date[0]}th`
											   const newDateString = date.join(', ');
											   return <Text>{newDateString}</Text>;
										   } else return <Text>None</Text>;
									   }
								   },
								   {
									   property: 'totalStrikes',
									   header: <Text>Total strikes</Text>,
									   render: datum => (
										   <Text>{datum.strikes}</Text>
									   )
								   },
							   ]}
					/>
				</div>
			</Box>
			{userOpen && (
				<Layer onEsc={() => setUserOpen(false)} onClickOutside={() => setUserOpen(false)} full={true}>
					<UserInfo userid={userId}/>
				</Layer>
			)}
		</>
	)
}
