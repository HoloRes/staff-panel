import {Box, DataTable, Text} from 'grommet';
import {useEffect, useState} from 'react';
import {Tip} from 'grommet/components/Tip';
import axios from 'axios';
import {store} from 'react-notifications-component';

export default function StrikeList() {
	const [strikes, setStrikes] = useState([]);
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
			const res = axios.get('/api/modlogs', {
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
			setStrikes(res.data.logs)
		}

		run();
	}, []);

	async function onMore() {
		if (total - offset < 50) {
			if (total - offset > 0) {
				const res = await axios.get('/api/modlogs', {
					params: {
						count: total - offset,
						offset
					}
				}).catch((e) => {
					store.addNotification(fetchErrorNotification);
					console.error(e);
				});

				setOffset(offset + 50);
				setStrikes([
					...strikes,
					...res.data.logs
				]);
			} else return;
		} else {
			const res = await axios.get('/api/modlogs', {
				params: {
					count: total,
					offset
				}
			}).catch((e) => {
				store.addNotification(fetchErrorNotification);
				console.error(e);
			});

			setOffset(offset + 50);
			setStrikes([
				...strikes,
				...res.data.logs
			]);
		}
	}


	return (
		<Box pad={{horizontal: 'small'}}>
			<DataTable fill='horizontal' pad='small' data={strikes} replace={true} onMore={() => onMore()}
					   columns={[
						   {
							   property: 'username',
							   header: <Text>User</Text>,
							   render: datum => (
								   <Tip dropProps={{align: {top: 'right'}}} content={
									   <Box pad='small' gap='small' width={{max: 'small'}} round='small'
											background='background-back' plain>
										   <Text>User ID: {datum.userId}</Text>
									   </Box>
								   }>
									   <Text>{datum.offender}</Text>
								   </Tip>
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
								   const date = datum.lastStrikeDate.toLocaleDateString('en-US', dateOptions).split(',');
								   date[0] = `${date[0]}th`
								   const newDateString = date.join(', ');
								   return <Text>{newDateString}</Text>;
							   }
						   },
						   {
							   property: 'strikeExpiration',
							   header: <Text>When next strike expires</Text>,
							   render: datum => {
								   if (datum.strikeExpiration instanceof Date) {
									   const date = datum.strikeExpiration.toLocaleDateString('en-US', dateOptions).split(',');
									   date[0] = `${date[0]}th`
									   const newDateString = date.join(', ');
									   return <Text>{newDateString}</Text>;
								   } else return <Text>{datum.strikeExpiration}</Text>;
							   }
						   },
						   {
							   property: 'totalStrikes',
							   header: <Text>Total strikes</Text>,
							   render: datum => (
								   <Text>{datum.totalStrikes}</Text>
							   )
						   },
					   ]}
			/>
		</Box>
	)
}
