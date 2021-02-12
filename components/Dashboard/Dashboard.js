import {Box, Button, Card, CardBody, FormField, Heading, Select, Text, TextArea, TextInput} from 'grommet';
import axios from 'axios';
import io from 'socket.io-client';
import parseDuration from 'parse-duration';
import {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {store} from 'react-notifications-component';
import {useSession} from 'next-auth/client';

export default function Dashboard() {
	const [modLog, setModLog] = useState([]);
	const [modFormSent, setModFormSent] = useState(false);
	const [session] = useSession();

	const socket = io('http://localhost:3001', {
		auth: {
			token: 'A6244*&6^n3mfyquEnsAVG!kP$rBmX!$aeaLjyxc63DPovYg2B'
		}
	});

	socket.on('log', (data) => {
		const newModlogs = [...modLog];
		newModlogs.splice(-1, 1);
		newModlogs.unshift(<div key={data.id}>
			<Text style={{opacity: '75%'}}>
				Case {data.id} - {data.type}
				<br/>
				<hr style={{width: '7.5vw', opacity: '25%', float: 'left'}}/>
			</Text>
			<br/>
			<Text size='16px'>
				<b>Offender:</b> {data.offender || data.userId}
				<br/>
				<b>Reason:</b> {data.reason}
				{
					data.type &&
					<>
						<br/>
						<b>Type:</b> {data.type}
						{
							data.duration &&
							<>
								<br/>
								<b>Duration:</b> {data.duration}
							</>
						}
					</>
				}
			</Text>
			<br/>
			<br/>
		</div>)
		setModLog(newModlogs);
	});

	useEffect(() => {
		axios.get(`/api/modlogs`, {
			params: {count: 3}
		})
			.then((res) => {
				const items = res.data.logs.map((modAction) => (
					<div key={modAction._id}>
						<Text style={{opacity: '75%'}}>
							Case {modAction._id} - {modAction.type}
							<br/>
							<hr style={{width: '7.5vw', opacity: '25%', float: 'left'}}/>
						</Text>
						<br/>
						<Text size='16px'>
							<b>Offender:</b> {modAction.offender || modAction.userId}
							<br/>
							<b>Reason:</b> {modAction.reason}
							{
								modAction.type &&
								<>
									<br/>
									<b>Type:</b> {modAction.type}
									{
										modAction.duration &&
										<>
											<br/>
											<b>Duration:</b> {modAction.duration}
										</>
									}
								</>
							}
						</Text>
						<br/>
						<br/>
					</div>
				));
				setModLog(items);
			})
			.catch((e) => {
				store.addNotification({
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
				});
				console.error(e);
			});
	}, []);

	const validate = values => {
		let errors = {};

		if (!values.userid) errors.userid = 'Required';
		if (!values.reason) errors.reason = 'Required';
		if (!values.type) errors.type = 'Required';

		// * Temporary user id check, needs to be replaced with an API call to get member details
		const valid = /^[0-9]{18}$/g.test(values.userid);
		if (!valid) errors.userid = 'Invalid user id';

		if (values.type === 'Mute') {
			const duration = parseDuration(values.duration, 'm');
			if (duration === null) errors.duration = 'Not a valid duration';
			else if (duration <= 0) errors.duration = 'A negative duration is not allowed';
		}

		return errors;
	}

	const formik = useFormik({
		initialValues: {
			userid: '',
			type: null,
			duration: '',
			reason: ''
		},
		validate,
		onSubmit: (values, {resetForm}) => {
			setModFormSent(true);
			const body = {
				moderator: session.user.image.split('/')[4],
				offender: values.userid,
				reason: values.reason
			};
			body.duration = values.duration ? parseDuration(values.duration, 'm') : undefined;

			axios.post(`/api/modAction/${values.type.toLowerCase()}`, body)
				.then((res) => {
					store.addNotification({
						title: 'Success',
						message: `${values.type} successful${res.data.info ? `, but ${res.data.info}` : ''}.`,
						type: 'success',
						insert: 'top',
						container: 'top-right',
						animationIn: ['animate__animated', 'animate__fadeIn'],
						animationOut: ['animate__animated', 'animate__fadeOut'],
						dismiss: {
							duration: 5000,
							onScreen: true
						}
					});
					resetForm({});
					setModFormSent(false);
				})
				.catch((e) => {
					setModFormSent(false);
					console.error(e);
					const res = e.response;
					const notification = {
						title: 'Error',
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

					if(res?.data?.info) store.addNotification({
						...notification,
						message: res.data.info,
					});
					else store.addNotification({
						...notification,
						message: 'Something went wrong, please try again.',
					});
				});
			setModFormSent(true);
		}
	});

	return (
		<Box pad={{vertical: 'small', horizontal: 'medium'}} direction='row' gap='large'>
			<Card width='medium' height='60vh' pad={{horizontal: 'small', vertical: 'none'}}>
				<Heading level='4' textAlign='center'>Modlog
					<hr style={{color: '#707070', opacity: '25%'}}/>
				</Heading>
				<CardBody>
					{modLog}
				</CardBody>
			</Card>
			<Card width='large' height='60vh' pad={{horizontal: 'small', vertical: 'none'}}>
				<Heading level='4' style={{maxWidth: '100%'}} textAlign='center'>Strike user
					<hr style={{color: '#707070', opacity: '25%'}}/>
				</Heading>
				<CardBody>
					<form onSubmit={formik.handleSubmit}>
						<Box direction='row' gap='xlarge'>
							<Box>
								<FormField name='userid' htmlfor='text-input-userid' label='User'
										   disabled={modFormSent}>
									<TextInput id='text-input-userid' name='userid' value={formik.values.userid}
											   onChange={formik.handleChange} onBlur={formik.handleBlur}
											   placeholder='User ID' disabled={modFormSent}/>
								</FormField>
								{(formik.errors.userid && formik.touched.userid) &&
								<Text color='status-critical'>{formik.errors.userid}</Text>}

								<FormField name='type' htmlfor='dropdown-input-type' label='Type' required
										   disabled={modFormSent}>
									<Select id='dropdown-input-type' name='type'
											options={['Strike', 'Warn', 'Mute', 'Kick', 'Ban']}
											value={formik.values.type} onChange={({value}) => {
										formik.setFieldValue('type', value);
										formik.setFieldTouched('type', true);
									}} onBlur={formik.handleBlur} disabled={modFormSent}/>
								</FormField>
								{(formik.errors.type && formik.touched.type) &&
								<Text color='status-critical'>{formik.errors.type}</Text>}
								{
									formik.values.type && formik.values.type === 'Mute' ?
										<>
											<FormField name='duration' htmlfor='text-input-duration' label='Duration'
													   required disabled={modFormSent}>
												<TextInput id='text-input-duration' name='duration'
														   value={formik.values.duration} onChange={formik.handleChange}
														   onBlur={formik.handleBlur} disabled={modFormSent}/>
											</FormField>
											{(formik.errors.duration && formik.touched.duration) &&
											<Text color='status-critical'>{formik.errors.duration}</Text>}
										</> : null
								}
							</Box>
							<Box>
								<FormField name='reason' htmlfor='text-input-reason' label='Reason' required
										   disabled={modFormSent}>
									<TextArea id='text-input-reason' name='reason' placeholder='Give a reason'
											  resize={false} style={{height: '350px', width: '385px'}}
											  value={formik.values.reason} onChange={formik.handleChange}
											  onBlur={formik.handleBlur} disabled={modFormSent}/>
								</FormField>
								{(formik.errors.reason && formik.touched.reason) &&
								<Text color='status-critical'>{formik.errors.reason}</Text>}

								<Button type='submit' primary label='Submit' disabled={modFormSent}/>
							</Box>
						</Box>
					</form>
				</CardBody>
			</Card>
			<Card width='medium' height='medium' pad={{horizontal: 'small', vertical: 'none'}}>
				<Heading level='4' textAlign='center'>User notes
					<hr style={{color: '#707070', opacity: '25%'}}/>
				</Heading>
				<CardBody>
					<FormField name='userid' htmlfor='text-input-userid'>
						<TextInput id='text-input-userid' name='userid'
								   placeholder='User ID'/> {/* TODO: Make controlled */}
					</FormField>
					<br/>
					<Button type='submit' primary label='Search'/>
					{/* TODO: Search and give popup with notes about user */}
				</CardBody>
			</Card>
		</Box>
	)
}
